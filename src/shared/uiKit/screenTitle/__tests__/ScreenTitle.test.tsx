import { Platform } from 'react-native';
import { IS_IOS } from '$domain/constants';
import { render } from '$domain/testing';
import { ScreenTitle } from '../ScreenTitle';

const mockTitleProps: Record<string, unknown>[] = [];
const mockToolbarProps: Record<string, unknown>[] = [];
const mockToolbarButtonProps: Record<string, unknown>[] = [];

const iconSourceMock = { uri: 'info-circle' };

const expectedIcon = IS_IOS ? 'gear' : iconSourceMock;

jest.mock('expo-router', () => {
  const Title = (props: Record<string, unknown>) => {
    mockTitleProps.push(props);

    return null;
  };

  const ToolbarButton = (props: Record<string, unknown>) => {
    mockToolbarButtonProps.push(props);

    return null;
  };

  const Toolbar = ({
    children,
    ...props
  }: Record<string, unknown> & { children?: React.ReactNode }) => {
    mockToolbarProps.push(props);

    return children;
  };

  return {
    Stack: {
      Title,
      Toolbar: Object.assign(Toolbar, { Button: ToolbarButton }),
    },
  };
});

describe('ScreenTitle component', () => {
  beforeEach(() => {
    mockTitleProps.length = 0;
    mockToolbarProps.length = 0;
    mockToolbarButtonProps.length = 0;
  });

  it('should forward the title to the stack', () => {
    render(<ScreenTitle title="Home" />);

    expect(mockTitleProps).toHaveLength(1);
    expect(mockTitleProps[0]?.children).toBe('Home');
  });

  it('should not enable the large title by default', () => {
    render(<ScreenTitle title="Home" />);

    expect(mockTitleProps[0]?.large).toBe(false);
  });

  it('should enable the large title when requested', () => {
    render(<ScreenTitle isLarge title="Home" />);

    expect(mockTitleProps[0]?.large).toBe(true);
  });

  it('should not render a toolbar when no item is provided', () => {
    render(<ScreenTitle title="Home" />);

    expect(mockToolbarProps).toHaveLength(0);

    render(<ScreenTitle title="Home" toolbar={[]} />);

    expect(mockToolbarProps).toHaveLength(0);
  });

  it('should render a toolbar button per item on the right by default', () => {
    const onPress = jest.fn();

    render(
      <ScreenTitle
        title="Profile"
        toolbar={[
          {
            icon: 'gear',
            iconSource: iconSourceMock,
            id: 'settings',
            label: 'Settings',
            onPress,
          },
          { id: 'logout', isDisabled: true, label: 'Logout', onPress },
        ]}
      />,
    );

    expect(mockToolbarProps[0]?.placement).toBe('right');
    expect(mockToolbarButtonProps).toHaveLength(2);

    expect(mockToolbarButtonProps[0]).toEqual(
      expect.objectContaining({
        accessibilityLabel: 'Settings',
        children: 'Settings',
        disabled: undefined,
        icon: expectedIcon,
        onPress,
      }),
    );

    expect(mockToolbarButtonProps[1]).toEqual(
      expect.objectContaining({
        accessibilityLabel: 'Logout',
        disabled: true,
        icon: undefined,
      }),
    );
  });

  it('should give Android the image source instead of the SF Symbol', () => {
    const platformSpy = jest.replaceProperty(Platform, 'OS', 'android');

    render(
      <ScreenTitle
        title="Profile"
        toolbar={[
          {
            icon: 'gear',
            iconSource: iconSourceMock,
            id: 'settings',
            label: 'Settings',
            onPress: jest.fn(),
          },
        ]}
      />,
    );

    expect(mockToolbarButtonProps[0]?.icon).toBe(iconSourceMock);

    platformSpy.restore();
  });

  it('should honor a custom toolbar placement', () => {
    render(
      <ScreenTitle
        title="Profile"
        toolbar={[{ id: 'done', label: 'Done', onPress: jest.fn() }]}
        toolbarPlacement="bottom"
      />,
    );

    expect(mockToolbarProps[0]?.placement).toBe('bottom');
  });
});

import { render } from '$testing';

import { ScreenTitle } from '../ScreenTitle';

const mockTitleProps: Record<string, unknown>[] = [];
const mockToolbarProps: Record<string, unknown>[] = [];
const mockToolbarButtonProps: Record<string, unknown>[] = [];

interface MockComponentProps extends Record<string, unknown> {
  children?: React.ReactNode;
}

jest.mock('expo-router', () => {
  const Title = (props: MockComponentProps) => {
    mockTitleProps.push(props);

    return null;
  };

  const ToolbarButton = (props: MockComponentProps) => {
    mockToolbarButtonProps.push(props);

    return null;
  };

  const Toolbar = ({ children, ...props }: MockComponentProps) => {
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

describe('ScreenTitle', () => {
  beforeEach(() => {
    mockTitleProps.length = 0;
    mockToolbarProps.length = 0;
    mockToolbarButtonProps.length = 0;
  });

  it('forwards the title to the native stack', async () => {
    await render(<ScreenTitle title="Home" />);

    expect(mockTitleProps[0]?.children).toBe('Home');
  });

  it.each([undefined, []])(
    'omits the toolbar without actions: %j',
    async (toolbar) => {
      await render(<ScreenTitle title="Home" toolbar={toolbar} />);

      expect(mockToolbarProps).toHaveLength(0);
    },
  );

  it('forwards action labels, handlers and disabled state to native toolbar buttons', async () => {
    const onSettings = jest.fn();
    const onLogout = jest.fn();
    await render(
      <ScreenTitle
        title="Profile"
        toolbar={[
          { id: 'settings', label: 'Settings', onPress: onSettings },
          {
            id: 'logout',
            isDisabled: true,
            label: 'Logout',
            onPress: onLogout,
          },
        ]}
      />,
    );

    expect(mockToolbarButtonProps).toHaveLength(2);
    expect(mockToolbarButtonProps[0]).toEqual(
      expect.objectContaining({ children: 'Settings', onPress: onSettings }),
    );
    expect(mockToolbarButtonProps[1]).toEqual(
      expect.objectContaining({
        children: 'Logout',
        disabled: true,
        onPress: onLogout,
      }),
    );
  });
});

import { RatingPrompt } from '$features/appRating';
import { Screen } from '$shared/components';

const RatingPromptScreen = () => {
  return (
    <Screen edges={['top', 'bottom']} testID="rating-prompt-screen">
      <RatingPrompt />
    </Screen>
  );
};

export default RatingPromptScreen;

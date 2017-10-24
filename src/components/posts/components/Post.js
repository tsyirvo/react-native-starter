import React from 'react';
import { View } from 'react-native';
import { string, func } from 'prop-types';

import {
  StyledContainerColumn,
  StyledContainerRow,
} from 'styledComponents/containers';
import { StyledTextBold, StyledText } from 'styledComponents/texts';

import Button from 'shared/Button';

const Post = ({ title, body, onEdit, onDelete }) => {
  return (
    <StyledContainerColumn>
      <View>
        <StyledTextBold>{title}</StyledTextBold>
        <StyledText>{body}</StyledText>
      </View>

      <StyledContainerRow>
        <Button action={() => onEdit()} label="Edit" />
        <Button action={() => onDelete()} label="Delete" />
      </StyledContainerRow>
    </StyledContainerColumn>
  );
};

Post.propTypes = {
  title: string.isRequired,
  body: string.isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
};

export default Post;

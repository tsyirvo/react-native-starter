import React from 'react';
import { string, func } from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';

import { STextBold, SText } from 'sc/texts';

import Button from 'shared/Button';

import { SWrapperPost, SWrapperText, SWrapperButtons } from '../styles';

const enhancer = onlyUpdateForKeys(['title', 'body']);

const Post = ({ title, body, onEdit, onDelete }) => {
  return (
    <SWrapperPost>
      <SWrapperText>
        <STextBold>{title}</STextBold>
        <SText>{body}</SText>
      </SWrapperText>

      <SWrapperButtons>
        <Button action={onEdit} label="Edit" />
        <Button action={onDelete} label="Delete" />
      </SWrapperButtons>
    </SWrapperPost>
  );
};

Post.propTypes = {
  title: string.isRequired,
  body: string.isRequired,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
};

export default enhancer(Post);

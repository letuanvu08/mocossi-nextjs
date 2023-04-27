import React from 'react';
import { css } from 'glamor';
import { Colors } from 'constants/theme';

const ModalCloseIcon = ({ style }: { style?: any }) => (
  <div {...css({
    background: Colors.Gray02,
    borderColor: Colors.Gray02,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    lineHeight: '32px',
    fontSize: 14,
    height: 32,
    width: 32,
    position: 'absolute',
    right: 16,
    top: 16,

    ':hover': {
      background: Colors.Gray03,
      borderColor: Colors.Gray03,
    },

    ...style,
  })}>
    <i className="ri-close-fill" style={{ fontSize: 18, color: Colors.Black }} />
  </div>
);

export default ModalCloseIcon;
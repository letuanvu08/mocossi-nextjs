import React from 'react';
import { Typography } from 'antd';
import { Colors } from 'constants/theme';

const ModalTitle = ({ title, style }: { title: string; style?: any }) => (
  <Typography.Title
    style={{
      color: Colors.Black,
      fontSize: 24,
      lineHeight: '42px',
      margin: 0,
      ...style,
    }}
  >{title}</Typography.Title>
);

export default ModalTitle;
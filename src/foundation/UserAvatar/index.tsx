import React from 'react';
import { Avatar } from 'antd';
import { Colors } from 'constants/theme';

const UserAvatar = (props) => {
  const {
    name,
    avatar,
    shortName,
    description,
    size,
    withRadius,
    style,
  } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', ...style }}>
      {avatar && (
        <div style={{
          backgroundColor: Colors.Gray02,
          backgroundImage: `url("${avatar}")`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          overflow: 'hidden',
          height: size,
          width: size,
          minWidth: size,

          ...withRadius ? { borderRadius: withRadius } : {},
        }} />
      )}

      {!avatar && (
        <Avatar
          size={size}
          icon={shortName}
          style={{
            backgroundColor: Colors.Gray02,
            border: `1px solid ${Colors.Gray03}`,
            color: Colors.Secondary,
            minWidth: size,
            ...withRadius ? { borderRadius: withRadius } : {},
          }}
        />
      )}

      {(name || description) && (
        <div style={{
          marginLeft: 12,
          flexShrink: 1,
          flexGrow: 1,
          overflow: 'hidden',
        }}>
          <div style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 500,
          }}>{name}</div>
          <div style={{ color: Colors.Gray04 }}>{description}</div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;

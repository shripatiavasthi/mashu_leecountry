import React from 'react';
import { Text, View } from 'react-native';
import { Svg, Image as ImageSvg } from 'react-native-svg';

import { MAP_STYLE } from './map-style';

export interface MarkerToolTipProps {
  title?: string;
  coverImage?: string;
  address?: string;
}

const MarkerToolTip: React.FC<MarkerToolTipProps> = ({ title, coverImage, address }) => {
  return (
    <View style={MAP_STYLE.markerToolTipContainer}>
      <View
        style={[
          MAP_STYLE.bubble,
          !coverImage && { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        {coverImage && (
          <View style={{ overflow: 'hidden', borderRadius: 4, width: 54 }}>
            <Svg style={MAP_STYLE.svg}>
              <ImageSvg
                width={'100%'}
                height={'100%'}
                preserveAspectRatio="xMidYMid slice"
                href={{ uri: coverImage }}
              />
            </Svg>
          </View>
        )}
        <View style={MAP_STYLE.textContainer}>
          <Text numberOfLines={2} style={MAP_STYLE.title}>
            {title}
          </Text>
          <Text numberOfLines={3} style={MAP_STYLE.address}>
            {address}
          </Text>
        </View>
      </View>
      <View style={MAP_STYLE.arrowBorder} />
      <View style={MAP_STYLE.arrow} />
    </View>
  );
};

export default MarkerToolTip;

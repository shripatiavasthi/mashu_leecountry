import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { CARD_STYLE } from '../../assets/styles/imports/cards-styles';

export interface CardProps {
  contentStyle?: StyleProp<ViewStyle>;
  iconBtn?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  contentStyle,
  iconBtn,
  title,
  subtitle,
  description,
  footer,
}) => {
  return (
    <View style={[CARD_STYLE.cardWrap, contentStyle]}>
      <View style={[CARD_STYLE.cardCloseBtn]}>{iconBtn}</View>
      <View style={[CARD_STYLE.cardHeaderWrap]}>
        {title != null && title}
        {subtitle != null && subtitle}
      </View>
      {description && (
        <View style={[CARD_STYLE.cardContentWrap]}>
          {description != null && description}
        </View>
      )}
      <View style={[CARD_STYLE.cardFooterWrap]}>
        {footer != null && footer}
      </View>
    </View>
  );
};

export default Card;

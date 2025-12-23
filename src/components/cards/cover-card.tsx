import React, { useEffect, useState } from 'react';
import { View, Text, Linking, Platform } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import openMap from 'react-native-open-maps';
import HTMLView from 'react-native-htmlview';
import { SvgUri } from 'react-native-svg';

import { LIST_VIEW_CARD_STYLE } from '../../assets/styles/screens/card-style';
import { COLORS } from '../../assets/styles/imports/variables';
import { FONT_SIZE_12 } from '../../assets/styles/imports/typography';
import Btn from '../buttons/btn';
import { getData } from '../../utils/helper/localStorage';

export interface CoverCardProps {
  coverImage?: string;
  title?: string;
  miles?: string;
  address?: string;
  description?: string;
  call?: string;
  buttonLabel?: string;
}

type IconsState = {
  location?: string;
  phone?: string;
  visit?: string;
  [key: string]: string | undefined;
};

const CoverCard: React.FC<CoverCardProps> = ({
  coverImage,
  title,
  miles,
  address,
  description,
  call,
  buttonLabel,
}) => {
  const [icons, setIcons] = useState<IconsState>({});

  const onVisit = () => {
    if (!address) return;
    openMap({
      end: address,
    });
  };

  const openDialer = () => {
    if (!call) return;
    Platform.OS === 'android'
      ? Linking.openURL(`tel:${call}`)
      : Linking.openURL(`telprompt:${call}`);
  };

  useEffect(() => {
    getData<any>('settings').then(res => {
      if (res?.commonIcons) {
        setIcons(res.commonIcons);
      }
    });
  }, []);

  return (
    <Card style={LIST_VIEW_CARD_STYLE.listingViewCard}>
      {coverImage && (
        <Card.Cover style={{ height: 160, resizeMode: 'cover' }} source={{ uri: coverImage }} />
      )}

      <Card.Content style={{ marginBottom: 10 }}>
        <View style={LIST_VIEW_CARD_STYLE.cardTitileWrap}>
          <Text style={LIST_VIEW_CARD_STYLE.cardTitilText}>{title}</Text>
          {miles && (
            <View style={LIST_VIEW_CARD_STYLE.cardBadgeWrap}>
              <Text style={LIST_VIEW_CARD_STYLE.cardBadge}>{`${miles} mi`}</Text>
            </View>
          )}
        </View>
        {address && (
          <View style={LIST_VIEW_CARD_STYLE.cardTitileWrap}>
            <SvgUri width={20} height={20} uri={icons.location} color={COLORS.blackColor} />
            <Text style={LIST_VIEW_CARD_STYLE.cardAddDes}>{address}</Text>
          </View>
        )}
        {description && (
          <View style={LIST_VIEW_CARD_STYLE.cardInfo}>
            <Text style={LIST_VIEW_CARD_STYLE.cardInfoHeading}>{'Information'}</Text>
            <View style={LIST_VIEW_CARD_STYLE.cardInfoPara}>
              <HTMLView
                value={description ?? ''}
                stylesheet={{
                  p: { color: COLORS.blackColor },
                }}
              />
            </View>
          </View>
        )}
      </Card.Content>
      <Card.Actions style={[LIST_VIEW_CARD_STYLE.cardActionsWrap]}>
        {call && (
          <View style={{ width: '49%' }}>
            <Btn
              size="medium"
              lablestyle={{ fontSize: FONT_SIZE_12 }}
              label={call}
              color={COLORS.secondaryColor}
              icon={<SvgUri width={20} height={20} uri={icons.phone} color={COLORS.whiteColor} />}
              onPress={openDialer}
            />
          </View>
        )}
        {address && (
          <View style={{ width: '49%' }}>
            <Btn
              mode="outlined"
              size="medium"
              lablestyle={{ fontSize: FONT_SIZE_12 }}
              label={buttonLabel}
              color={COLORS.secondaryColor}
              icon={<SvgUri width={20} height={20} uri={icons.visit} color={COLORS.secondaryColor} />}
              onPress={onVisit}
            />
          </View>
        )}
      </Card.Actions>
    </Card>
  );
};

export default CoverCard;

import React, { useContext, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Paragraph } from 'react-native-paper';

import { COLORS } from '../../assets/styles/imports/variables';
import { CARD_STYLE } from '../../assets/styles/imports/cards-styles';
import Btn from '../buttons/btn';
import Card from '../cards/card';
import { getData, storeData } from '../../utils/helper/localStorage';
import { AuthContext } from '../../redux/store';

export interface AdsBannerProps {
  icon?: string;
  title?: string;
  description?: string;
  btnText?: string;
  onPress?: () => void;
  closeButton?: string;
}

const AdsBanner: React.FC<AdsBannerProps> = ({
  icon,
  title,
  description,
  btnText,
  onPress,
  closeButton,
}) => {
  const [settingsData, setSettingsData] = useState<any>({});
  const authContext = useContext(AuthContext);
  const dispatch = authContext?.dispatch;

  useEffect(() => {
    getData<any>('settings').then(res => {
      if (res) {
        setSettingsData(res);
      }
    });
  }, []);

  // Updates the status of bottomTile to false & stores new SETTINGS data into local-storage.
  const updateSettingsData = () => {
    const settings = { ...settingsData };
    if (settings.bottomTile) {
      settings.bottomTile.status = false;
    }
    dispatch?.({
      type: 'UPDATE_BOTTOMTILE_STATUS',
      bottomTileStatus: false,
    });
    storeData('settings', settings);
  };

  return (
    <View style={[CARD_STYLE.infoCardWrap]}>
      <Card
        contentStyle={[CARD_STYLE.infoCard]}
        description={
          <View style={[CARD_STYLE.infoContentWrap]}>
            <View style={[CARD_STYLE.infoAvtarWrap]}>
              <Image source={{ uri: icon }} style={[CARD_STYLE.infoAvtarImg]} />
            </View>
            <View style={[CARD_STYLE.infoAvtarDescriptonWrap]}>
              <View style={[CARD_STYLE.infoDescriptonWrap]}>
                <Text style={[CARD_STYLE.infoTitle]} numberOfLines={1}>
                  {title}
                </Text>
                <Paragraph style={[CARD_STYLE.overline]} numberOfLines={1}>
                  {description}
                </Paragraph>
                <View style={[CARD_STYLE.btnWrap, CARD_STYLE.infoBtnWrap]}>
                  <Btn
                    label={btnText}
                    color={COLORS.secondaryColor}
                    size="small"
                    onPress={onPress}
                    lablestyle={{
                                    color: COLORS.whiteColor,
                                    fontWeight: '700',
                                    letterSpacing: 0.1,
                                    marginBottom: 7,
                                    bottom: 3,
                                    
                                  }}
                  />
                </View>
              </View>
              <View style={[CARD_STYLE.infoActionWrap]}>
                <TouchableOpacity style={[CARD_STYLE.closeButton]} onPress={updateSettingsData}>
                  <SvgUri uri={closeButton} width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default AdsBanner;

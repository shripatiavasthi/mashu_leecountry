import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Dimensions, Image, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { CAROUSEL_STYLE } from './carousel-style';
import { COLORS } from '../../assets/styles/imports/variables';
import { FONT_ARIAL_REGULAR } from '../../assets/styles/imports/typography';
import Btn from '../buttons/btn';

const windowWidth = Dimensions.get('window').width;

export interface CarouselItem {
  imageUrl: string;
  title: { en?: string; [key: string]: string | undefined };
  mediaType?: string | null;
  fileUrl?: string;
  url?: string;
}

export interface SnapCarouselProps {
  data: CarouselItem[];
  actionButtonLabel?: string;
}

const SnapCarousel: React.FC<SnapCarouselProps> = ({ data = [], actionButtonLabel }) => {
  const [items, setItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const renderItem = ({ item }: { item: CarouselItem; index: number }) => (
    <View style={[CAROUSEL_STYLE.carouselWrap, { width: windowWidth }]}>
      <View style={[CAROUSEL_STYLE.carouselItem]}>
        <View style={[CAROUSEL_STYLE.carouselImageWrap]}>
          <Image source={{ uri: item.imageUrl }} style={[CAROUSEL_STYLE.carouselImage]} />
        </View>
        <View style={[CAROUSEL_STYLE.textWrap]}>
          <Text style={[CAROUSEL_STYLE.description]}>{item.title?.en ?? ''}</Text>
        </View>
        {item.mediaType != null && (
          <View style={[CAROUSEL_STYLE.btnWrap]}>
            <Btn
              label={actionButtonLabel}
              size="small"
              color={COLORS.primaryColor}
              style={{ backgroundColor: COLORS.whiteColor, color: COLORS.primaryColor }}
              lablestyle={{
                color: COLORS.secondaryColor,
                fontFamily: FONT_ARIAL_REGULAR,
                fontWeight: '700',
                letterSpacing: 0.1,
              }}
              contentStyle={[CAROUSEL_STYLE.btnContent, { marginRight: 0 }]}
              onPress={() => {
                const link = item.mediaType === 'attachment' ? item.fileUrl : item.url;
                if (link) {
                  Linking.openURL(`${link}`);
                }
              }}
            />
          </View>
        )}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['transparent', COLORS.darkVioletColor]}
          style={[CAROUSEL_STYLE.linearGradientWrap]}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <SwiperFlatList
        data={items}
        renderItem={renderItem}
        showPagination
        paginationStyleItem={CAROUSEL_STYLE.dotStyle}
        paginationStyleItemInactive={{ ...CAROUSEL_STYLE.dotStyle, opacity: 0.2 }}
        autoplay={false}
      />
    </SafeAreaView>
  );
};

export default SnapCarousel;

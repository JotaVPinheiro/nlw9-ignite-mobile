import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import { GameParams } from "../../@types/navigation";
import { styles } from "./styles";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { AdCard, AdCardProps } from "../../components/AdCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [duoDiscord, setDuoDiscord] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const game = route.params as GameParams;

  async function getDiscordUser(adId: string) {
    fetch(`http://192.168.18.29:3333/ads/${adId}/discord`)
      .then((response) => response.json())
      .then(({ discord }) => setDuoDiscord(discord));
  }

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.18.29:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then(setAds);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image style={styles.logo} source={logoImg} />

          <View style={styles.right} />
        </View>

        <Image
          style={styles.cover}
          source={{ uri: game.bannerUrl }}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AdCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            ads.length > 0 ? styles.contentList : styles.emptyContentList
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios para este jogo.
            </Text>
          )}
        />

        <DuoMatch
          visible={duoDiscord.length > 0}
          discord={duoDiscord}
          onClose={() => setDuoDiscord("")}
        />
      </SafeAreaView>
    </Background>
  );
}

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GameController } from "phosphor-react-native";

import { THEME } from "../../theme";
import { AdInfo } from "./AdInfo";
import { styles } from "./styles";

export interface AdCardProps {
  id: string;
  name: string;
  weekDays: number[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hoursStart: string;
  hoursEnd: string;
}

interface Props {
  data: AdCardProps;
  onConnect: () => void;
}

export function AdCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <AdInfo label="Nome" value={data.name} />

      <AdInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} ano${data.yearsPlaying === 1 ? "" : "s"}`}
      />

      <AdInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dia${
          data.weekDays.length === 1 ? "" : "s"
        } \u2022 ${data.hoursStart} - ${data.hoursEnd}`}
      />

      <AdInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        valueColor={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}

import React from "react";

import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

// store
import useAppStore from "@/store/store";

// types
import { RickObject } from "@/types/types";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledOpacity = styled(TouchableOpacity);

export default function SelectCards() {
  const selectedRicks = useAppStore((store) => store.selectedRicks);

  return (
    <StyledView className="flex-1 flex-row flex-wrap">
      {selectedRicks.map((rick) => (
        <SelectCardItem key={rick.id} rick={rick} />
      ))}
    </StyledView>
  );
}

interface Props {
  rick: RickObject;
}

function SelectCardItem({ rick }: Props) {
  const selectRick = useAppStore((store) => store.selectRick);

  return (
    <StyledView className="flex-1 w-1/2 max-w-[50%] p-1">
      <StyledView className="flex-1 flex-row items-center justify-between p-2 bg-card rounded-md">
        <StyledText className="!text-white flex-1">{rick.name}</StyledText>

        <StyledOpacity
          className="bg-button px-[10px] py-[5px] rounded-md"
          onPress={() => selectRick(rick)}
        >
          <StyledText className="!text-white">X</StyledText>
        </StyledOpacity>
      </StyledView>
    </StyledView>
  );
}

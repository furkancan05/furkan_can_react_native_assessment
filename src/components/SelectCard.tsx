import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styled } from "nativewind";

// types
import { RickObject } from "@/types/types";

// store
import useAppStore from "@/store/store";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledOpacity = styled(TouchableOpacity);

function SelectCard() {
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
      <StyledView className="flex-1 flex-row items-center justify-between p-2 bg-[#414b4d] rounded-md">
        <StyledText className="text-white">{rick.name}</StyledText>
        <StyledOpacity
          className="bg-[#0e1011] px-[10px] py-[5px] rounded-md"
          onPress={() => selectRick(rick)}
        >
          <StyledText className="text-white">X</StyledText>
        </StyledOpacity>
      </StyledView>
    </StyledView>
  );
}

export default React.memo(SelectCard);

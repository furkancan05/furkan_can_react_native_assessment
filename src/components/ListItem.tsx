import React from "react";

import { styled } from "nativewind";
import { TouchableOpacity, Image, Text } from "react-native";

// store
import useAppStore from "@/store/store";

// utils
import { cn } from "@/utils/cn";

// types
import { RickObject } from "@/types/types";

const StyledOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledText = styled(Text);

interface Props {
  rick: RickObject;
}

function ListItem({ rick }: Props) {
  const search = useAppStore((store) => store.search);
  const selectedRicks = useAppStore((store) => store.selectedRicks);
  const selectRick = useAppStore((store) => store.selectRick);

  const selected = !!selectedRicks.find((sr) => sr.id === rick.id);

  // Highlight searched text part of names
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <StyledText className="flex items-end text-white/50 flex-1 text-base">
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <StyledText key={i} className="text-white text-base font-bold">
              {part}
            </StyledText>
          ) : (
            part
          )
        )}
      </StyledText>
    );
  };

  return (
    <StyledOpacity
      onPress={() => selectRick(rick)}
      className={cn(
        "flex-1 flex-row items-center gap-2 p-3 my-1 mx-1 rounded-xl",
        {
          "bg-white/10": selected,
        }
      )}
    >
      <StyledImage className="w-10 h-10 rounded-md" src={rick.image} />
      {getHighlightedText(rick.name, search)}
      <StyledText className="text-white/50 text-xs">{`${rick.episode.length} episodes`}</StyledText>
    </StyledOpacity>
  );
}

export default React.memo(ListItem);

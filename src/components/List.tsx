import React from "react";

import { styled } from "nativewind";
import { FlatList, View } from "react-native";

// components
import ListItem from "@/components/ListItem";

// store
import useAppStore from "@/store/store";

// utils
import { cn } from "@/utils/cn";

const StyledView = styled(View);

interface Props {
  reFetch: () => void;
}

export default function List({ reFetch }: Props) {
  const ricks = useAppStore((store) => store.ricks);

  return (
    <StyledView
      className={cn(
        "w-full h-0 mt-5 border-solid border-[1px] rounded-lg border-transparent",
        {
          "flex-1 border-white/30 py-2 px-1": ricks.length > 0,
        }
      )}
    >
      <FlatList
        data={ricks}
        onEndReached={reFetch}
        ItemSeparatorComponent={() => (
          <StyledView className="w-full h-[1px] bg-white/30" />
        )}
        renderItem={(data) => <ListItem rick={data.item} />}
      />
    </StyledView>
  );
}

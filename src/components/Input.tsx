import React from "react";

import { styled } from "nativewind";
import { ActivityIndicator, FlatList, TextInput, View } from "react-native";

// components
import SelectCard from "@/components/SelectCard";

// store
import useAppStore from "@/store/store";

const StyledView = styled(View);
const StyledInput = styled(TextInput);
const StyledIndicator = styled(ActivityIndicator);

interface Props {
  loading: boolean;
  setError: () => void;
}

export default function Input({ loading, setError }: Props) {
  const search = useAppStore((store) => store.search);
  const setSearch = useAppStore((store) => store.setSearch);

  return (
    <StyledView className="relative border-solid border-[1px] border-white/30 focus:border-white/80 mt-10 rounded-lg transition-colors p-2">
      <SelectCard />

      <StyledInput
        placeholder="John Doe Rick"
        className="w-full h-[50px] text-lg text-white/80"
        defaultValue={search}
        onChangeText={(text) => {
          setError();
          setSearch(text);
        }}
      />

      {loading ? (
        <StyledIndicator className="absolute right-2 top-1/2 -translate-y-1/2" />
      ) : null}
    </StyledView>
  );
}

import React from "react";

import { styled, withExpoSnack } from "nativewind";
import { View, SafeAreaView, Text, Keyboard, ScrollView } from "react-native";

// components
import Input from "@/components/Input";
import List from "@/components/List";

// hooks
import useDebounce from "@/hooks/useDebounce";

// store
import useAppStore from "@/store/store";

// types
import { ErrorResponse, RicksResponse } from "@/types/types";
import { getNextRicks, getRicks } from "@/utils/fetchers";

const StyledView = styled(View);
const StyledText = styled(Text);

function TabLayout() {
  const search = useAppStore((store) => store.search);
  const ricks = useAppStore((store) => store.ricks);
  const setRicks = useAppStore((store) => store.setRicks);
  const clearRicks = useAppStore((store) => store.clearRicks);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [continuation, setContinuation] = React.useState<string | undefined>(
    undefined
  );

  const debounce = useDebounce(search, 1000);

  // fetch ricks on change search text (with debounce)
  const getSearchedRicks = async () => {
    if (!search) {
      clearRicks();
      return;
    }

    setLoading(true);

    const response = await getRicks(search);

    if ((response as ErrorResponse).error) {
      clearRicks();
      setError((response as ErrorResponse).error);
      setLoading(false);
      return;
    }

    setRicks((response as RicksResponse).results);
    setContinuation((response as RicksResponse).info.next);
    Keyboard.dismiss();

    setLoading(false);
  };

  // if continuation is exist fetch for the next page when reach end of the list
  const reFetch = async () => {
    if (!continuation) return;

    setLoading(true);

    const response = await getNextRicks(continuation);

    if ((response as ErrorResponse).error) {
      clearRicks();
      setError((response as ErrorResponse).error);
      setLoading(false);
      return;
    }

    setRicks((response as RicksResponse).results);
    setContinuation((response as RicksResponse).info.next);

    setLoading(false);
  };

  React.useEffect(() => {
    getSearchedRicks();
  }, [debounce]);

  return (
    <StyledView className="flex-1 bg-background p-5">
      <SafeAreaView style={{ flex: 1 }}>
        <Input loading={loading} setError={() => setError("")} />

        {error ? (
          <StyledText className="text-white/50 mt-10 text-center">
            {error}
          </StyledText>
        ) : null}

        {ricks && ricks.length > 0 ? <List reFetch={reFetch} /> : null}
      </SafeAreaView>
    </StyledView>
  );
}

export default withExpoSnack(TabLayout);

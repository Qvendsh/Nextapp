import React, { FC } from "react";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
interface IProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

const Providerr: FC<IProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </>
  );
};

export default Providerr;

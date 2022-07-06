import { useMutation, useQuery, useQueryClient } from "react-query";
import { client as api } from "../services/APIService";
import {
  NewUser,
  SeatsAvailable,
  User,
  DeleteUserInput,
  CurrentUser,
  UserQuery,
  TableUser,
} from "./types";
import { Auth } from "aws-amplify";
import { useMemo } from "react";

export function useUser() {
  const { isLoading, isError, data } = useQuery<CurrentUser, Error>(
    "auth",
    async () => {
      const data = await api.get("/users/me");
      const session = await Auth.currentSession();
      const { payload } = session.getIdToken();
      console.log(JSON.parse(payload["custom:tenant-connections"]));
      return {
        ...data,
        company: payload["custom:company-name"],
        username: payload["cognito:username"],
        tenantID: payload["custom:tenant-id"],
        emailVerified: payload["email_verified"],
        accountOwner: !!payload["custom:account-owner"],
      };
    }
  );

  if (isLoading || isError || !data) {
    return;
  }

  return data;
}

export function useCreateUser() {
  return useMutation<void, Error, NewUser>(async (user) => {
    const session = await Auth.currentSession();
    const { payload } = session.getIdToken();

    user.company = payload["custom:company-name"];

    return api.post(`/users`, user);
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteUserInput>(
    async ({ userId }) => {
      return api.delete(`/users/${userId}`);
    },
    {
      onSuccess: async (_, userId) => {
        await queryClient.invalidateQueries(["user", userId], {
          refetchActive: false,
          refetchInactive: false,
        });
        await queryClient.invalidateQueries("users");
        await queryClient.invalidateQueries("seats");
      },
    }
  );
}

export function useUsers() {
  return useQuery<User[], Error>("users", async () => await api.get("/users"));
}

export function useSeatsAvailable() {
  const result = useQuery<SeatsAvailable, Error>("seats", async () => {
    return await api.get("/users/available-seats");
  });

  if (result.isLoading || result.isError || !result.data) {
    return { maxSeats: 0, seatsAvailable: 0 };
  }

  return result.data;
}

export const useTableUsers = (query: UserQuery): TableUser[] => {
  const mapUsers = (query: UserQuery): TableUser[] => {
    if (query.isLoading) {
      return [];
    }
    if (query.isError) {
      return [];
    }
    if (!query.data) {
      return [];
    }
    return query.data.map(({ id, email, firstName, lastName, createdAt }) => ({
      id,
      email,
      createdAt,
      user: { firstName, lastName },
      role: "",
    }));
  };
  return useMemo<TableUser[]>(() => mapUsers(query), [query]);
};

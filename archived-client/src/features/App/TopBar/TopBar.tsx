import React, { useState } from "react";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Notifications from "@material-ui/icons/Notifications";
import { UserMenu } from "../../../components/UserMenu";
import { SearchBar } from "../SearchBar";
import { NotifyModal } from "./NotifyModal";
import { useInvites } from "../../../hooks/invites";
import styled from "styled-components";

export const TopBar = () => {
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const invites = useInvites();

  const unread = (invites.data || []).filter((invite) => invite.read === false);

  const toggleNotifications = () => setNotificationsOpen(!isNotificationsOpen);

  return (
    <>
      <Bar>
        <SearchBar />
        <menu>
          <Badge
            color="primary"
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={unread?.length}
          >
            <AlertButton onClick={toggleNotifications}>
              <Notifications className={isNotificationsOpen ? "active" : ""} />
            </AlertButton>
          </Badge>
          <UserMenu />
        </menu>
      </Bar>
      <NotifyModal invites={invites.data} open={isNotificationsOpen} />
    </>
  );
};

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--p32);
  height: var(--p64);
  background: var(--white2);
  border-bottom: 1px solid var(--gray2);
  menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const AlertButton = styled(IconButton)`
  background: #d9e2ec;
  height: var(--p32);
  width: var(--p32);
  .active {
    color: var(--blue6);
  }
`;

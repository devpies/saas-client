import React from "react";
import { Link } from "react-router-dom";
import { Project } from "../../Project/types";
import { styled } from "@mui/material/styles";
import { useTeam, useTeamMemberships } from "../../../hooks/teams";
import { Memberships } from "../../Project/types";
import { Avatar } from "../../../components/Avatar";
import { useTenantMap } from "../../../hooks/users";
import { Loader } from "../../../components/Loader";

interface Props {
  project: Project;
  seq: number;
}

export const Card = ({ project, seq }: Props) => {
  const { data: memberships } = useTeamMemberships(project.teamId);
  const { data: team } = useTeam(project.teamId);
  const { isLoading, isError, data } = useTenantMap();

  const color = (seq % 9) + 1;

  if (isLoading || isError || data === undefined) {
    return <Loader />;
  }

  return (
    <StyledCard className="shade2">
      <Link
        key={project.id}
        to={`/${data[project.tenantId]}/projects/${project.id}`}
      >
        <div className={`color-tip badge${color}`} />
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardSubtitle>Developed by {team ? team.name : "Me"}</CardSubtitle>
        </CardHeader>
        <CardBody>
          <CardText>{project.description}</CardText>
          {memberships && renderMembers(4, memberships)}
        </CardBody>
      </Link>
    </StyledCard>
  );
};

function renderMembers(maxSize: number, memberships: Memberships[]) {
  const badgeColor = (index: number) => (index % 9) + 1;

  return (
    <Avatars>
      <ul>
        {memberships && (
          <StyledMembers>
            {memberships.map((membership, index) => (
              <Avatar
                key={membership.id}
                alt="user avatar"
                size="sm"
                badgeColor={`badge${badgeColor(index)}`}
                membership={membership}
              />
            ))}
          </StyledMembers>
        )}
        {memberships.length > maxSize && (
          <li className="hidden-avatars">{memberships.length - maxSize}+</li>
        )}
      </ul>
    </Avatars>
  );
}

const StyledCard = styled("div")`
  width: var(--p256);
  height: var(--p192);
  margin: 0 var(--p16) var(--p16) 0;
  background: var(--white1);
  border-radius: 4px;
  text-transform: capitalize;
  position: relative;
  transition: transform 0.3s ease-out;
  &:hover {
    transform: translate(0, -8px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  a {
    display: flex;
    flex: 0 1 calc(25% - var(--p16));
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    font-size: var(--p16);
    text-decoration: none;
    color: var(--primary);
  }
  .color-tip {
    height: var(--p8);
    width: 100%;
    border-radius: 4px 4px 0 0;
  }

  /* mobile first */
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-right: 0;
  }
`;

const CardHeader = styled("div")`
  width: 100%;
  min-height: 82px;
  padding: var(--p16);
  box-sizing: border-box;
  border-bottom: 1px solid var(--gray1);
`;
const CardBody = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  height: calc(100% - var(--p16) - var(--p16)- var(--p8));
  width: 100%;
  padding: var(--p16);
  box-sizing: border-box;
`;

const StyledMembers = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Avatars = styled("div")`
  display: flex;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    direction: rtl;
  }
  li {
    width: 36px;
    height: 36px;
    margin-left: -12px;
  }
  .hidden-avatars {
    font-family: ProximaNova-Bold;
    width: 36px;
    height: 36px;
    position: relative;
    left: -20px;
    background: var(--secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid var(--white1);
    margin-left: var(--p8);
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--white1);
  }
`;

const CardTitle = styled("h2")`
  font-family: ProximaNova-Bold;
  font-size: var(--p16);
  margin-top: 0;
`;

const CardSubtitle = styled("p")`
  font-family: ProximaNova-Regular;
  font-size: var(--p12);
  margin: 0;
`;

const CardText = styled("p")`
  font-family: ProximaNova-Regular;
  font-size: var(--p12);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

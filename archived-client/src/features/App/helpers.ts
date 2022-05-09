export function getUserInitials(firstName: string, lastName: string) {
  return firstName.substring(0, 1) + (lastName || "").substring(0, 1);
}

export function getTeamInitials(teamName: string) {
  if (teamName.includes(" ")) {
    const names = teamName.split(" ");
    return names[0].substring(0, 1) + names[1].substring(0, 1);
  } else {
    return teamName.substring(0, 2);
  }
}

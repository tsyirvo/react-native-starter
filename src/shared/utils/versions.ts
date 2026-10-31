const VERSION_PATTERN =
  /^v?(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)$/u;

const parseVersion = (version: string) => {
  const groups = VERSION_PATTERN.exec(version.trim())?.groups;

  if (!groups) {
    throw new TypeError(`Invalid version: "${version}"`);
  }

  return [
    Number(groups.major),
    Number(groups.minor),
    Number(groups.patch),
  ] as const;
};

const compareVersions = (a: string, b: string): number => {
  const [leftMajor, leftMinor, leftPatch] = parseVersion(a);
  const [rightMajor, rightMinor, rightPatch] = parseVersion(b);

  return (
    leftMajor - rightMajor || leftMinor - rightMinor || leftPatch - rightPatch
  );
};

export const isVersionAtLeast = (version: string, minimumVersion: string) =>
  compareVersions(version, minimumVersion) >= 0;

export const isVersionBelow = (version: string, targetVersion: string) =>
  compareVersions(version, targetVersion) < 0;

const VERSION_PATTERN = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

const parseVersion = (version: string) => {
  const match = VERSION_PATTERN.exec(version.trim());

  if (!match) {
    throw new TypeError(`Invalid version: "${version}"`);
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])] as const;
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

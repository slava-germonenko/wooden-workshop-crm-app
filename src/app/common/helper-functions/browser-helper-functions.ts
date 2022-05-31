import { getParser } from 'bowser';

export function getDeviceName(): string {
  const device = getParser(window.navigator.userAgent);
  return `${device.getBrowserName()} ${device.getBrowserVersion()} на ${device.getOSName()}`;
}

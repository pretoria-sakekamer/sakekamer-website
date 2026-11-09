import type { CSSProperties } from 'react';
import {
  ArrowLeftRight, ArrowRight, Calendar, Check, ChevronDown, CircleAlert, CircleCheck, Clock,
  Globe, GraduationCap, Handshake, Info, Landmark, Mail, MapPin, Menu, MonitorSmartphone,
  Phone, Search, TrendingUp, X, type LucideIcon,
} from 'lucide-react';

/**
 * Lucide icon registry. The prototype loaded icons from the lucide-static CDN by name;
 * production imports only the icons we use so the bundle stays small.
 * Add an entry here (kebab-case name → lucide-react export) before using a new icon.
 */
const ICONS = {
  'arrow-left-right': ArrowLeftRight,
  'arrow-right': ArrowRight,
  calendar: Calendar,
  check: Check,
  'chevron-down': ChevronDown,
  'circle-alert': CircleAlert,
  'circle-check': CircleCheck,
  clock: Clock,
  globe: Globe,
  'graduation-cap': GraduationCap,
  handshake: Handshake,
  info: Info,
  landmark: Landmark,
  mail: Mail,
  'map-pin': MapPin,
  menu: Menu,
  'monitor-smartphone': MonitorSmartphone,
  phone: Phone,
  search: Search,
  'trending-up': TrendingUp,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  /** Lucide icon name, kebab-case (e.g. "arrow-right", "calendar", "map-pin"). */
  name: IconName;
  size?: number;
  color?: string;
  /** Accessible label; omit for decorative icons. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/** Renders a Lucide line icon tinted with currentColor. Use for every glyph in UI; never emoji. */
export function Icon({ name, size = 20, color = 'currentColor', label, className, style }: IconProps) {
  const Cmp = ICONS[name];
  return (
    <Cmp
      size={size}
      color={color}
      strokeWidth={2}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={className}
      style={{ display: 'inline-block', flex: 'none', ...style }}
    />
  );
}

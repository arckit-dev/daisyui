# @arckit/daisyui

DaisyUI/Tailwind component library with primitives, blocks, headless utilities, icons, and theme support.

[![npm version](https://img.shields.io/npm/v/@arckit/daisyui)](https://www.npmjs.com/package/@arckit/daisyui)
[![npm downloads](https://img.shields.io/npm/dm/@arckit/daisyui)](https://www.npmjs.com/package/@arckit/daisyui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@arckit/daisyui)](https://bundlephobia.com/package/@arckit/daisyui)
[![codecov](https://codecov.io/gh/arckit-dev/daisyui/graph/badge.svg)](https://codecov.io/gh/arckit-dev/daisyui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Subpath Exports](#subpath-exports)
- [Framework Integration](#framework-integration)
- [Contributing](#contributing)
- [License](#license)

<h2 id="about">About</h2>

A framework-agnostic React component library built on [DaisyUI](https://daisyui.com/) and [Tailwind CSS](https://tailwindcss.com/). Components that need routing or image optimization use the `asChild` pattern (via [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/utilities/slot)) to stay decoupled from any specific framework.

<h2 id="installation">Installation</h2>

```bash
pnpm add @arckit/daisyui
```

<h2 id="usage">Usage</h2>

### Basic components (no framework dependency)

```tsx
import { Button, Badge, Card, Input } from '@arckit/daisyui/primitives';

<Button color='btn-primary'>Submit</Button>
<Badge color='badge-info'>New</Badge>
```

### Link with `asChild` (framework-agnostic)

```tsx
import { Link } from '@arckit/daisyui/primitives';

// Plain HTML anchor (default)
<Link href='/about'>About</Link>

// With Next.js Link
import NextLink from 'next/link';

<Link href='/about' asChild>
  <NextLink>About</NextLink>
</Link>
```

### ButtonLink with `asChild`

```tsx
import { ButtonLink } from '@arckit/daisyui/primitives';
import NextLink from 'next/link';

<ButtonLink href='/dashboard' color='btn-primary' asChild>
  <NextLink>Dashboard</NextLink>
</ButtonLink>
```

### Avatar with custom image

```tsx
import { Avatar } from '@arckit/daisyui/primitives';
import Image from 'next/image';

// Plain HTML img (default)
<Avatar src='/photo.jpg' alt='User' />

// With Next.js Image via imageSlot
<Avatar
  src='/photo.jpg'
  alt='User'
  imageSlot={<Image src='/photo.jpg' alt='User' fill />}
/>
```

### ItemCard with `asChild`

```tsx
import { ItemCard, ItemCardHeader, ItemCardContent } from '@arckit/daisyui/blocks';
import NextLink from 'next/link';

<ItemCard href='/items/1' asChild>
  <NextLink>
    <ItemCardHeader withArrow>Item title</ItemCardHeader>
    <ItemCardContent>Description</ItemCardContent>
  </NextLink>
</ItemCard>
```

<h2 id="subpath-exports">Subpath Exports</h2>

| Import | Contents |
|--------|----------|
| `@arckit/daisyui` | Everything |
| `@arckit/daisyui/primitives` | Button, Link, ButtonLink, Avatar, Badge, Card, Input, Modal, Dropdown, Popover, Tooltip, ComboBox, SortableList, etc. |
| `@arckit/daisyui/blocks` | Footer, Pagination, Breadcrumbs, ItemCard, SkipLinks, Toaster, ThemeChanger, PageHeader, EmptyState, etc. |
| `@arckit/daisyui/headless` | CollapseController, useInjectableModal |
| `@arckit/daisyui/icons` | Icon size constants |
| `@arckit/daisyui/theme` | ThemeProvider |
| `@arckit/daisyui/utils` | `cn()` classname utility (clsx + tailwind-merge) |

<h2 id="framework-integration">Framework Integration</h2>

This library is framework-agnostic. Components that typically depend on a framework (Link, Image) use the **`asChild` pattern** to delegate rendering to the consumer.

For Next.js projects, you can create thin wrappers:

```tsx
// your-app/components/link.tsx
import NextLink from 'next/link';
import { Link as DaisyLink, type LinkProps } from '@arckit/daisyui/primitives';

export const Link = (props: LinkProps) => (
  <DaisyLink asChild {...props}>
    <NextLink href={props.href}>{props.children}</NextLink>
  </DaisyLink>
);
```

<h2 id="contributing">Contributing</h2>

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

<h2 id="license">License</h2>

[MIT](LICENSE) &copy; Marc Gavanier

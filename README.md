# @umituz/react-native-swipe-actions

iOS Mail-style swipe-to-reveal actions for React Native list items with pre-built actions, haptic feedback, and smooth animations.

## Installation

```bash
npm install @umituz/react-native-swipe-actions
```

## Peer Dependencies

- `react` >= 18.2.0
- `react-native` >= 0.74.0
- `@umituz/react-native-design-system` *
- `expo-haptics` *
- `react-native-gesture-handler` >= 2.16.0
- `react-native-reanimated` >= 3.10.0

## Features

- ✅ Pre-built action types (delete, archive, edit, share, favorite, more)
- ✅ Custom actions with icon, label, color
- ✅ Haptic feedback integration
- ✅ Theme-aware colors from design-system
- ✅ Smooth animations with Reanimated v3
- ✅ Left and right swipe support
- ✅ Offline-compatible (100% client-side)

## Usage

### Basic Usage

```tsx
import { SwipeableItem, useSwipeActions } from '@umituz/react-native-swipe-actions';

const MyList = () => {
  const { createDeleteAction, createArchiveAction } = useSwipeActions();

  return (
    <SwipeableItem
      leftActions={[createArchiveAction(() => archiveItem(id))]}
      rightActions={[createDeleteAction(() => deleteItem(id))]}
    >
      <ListItem title="My Item" />
    </SwipeableItem>
  );
};
```

### Custom Action

```tsx
<SwipeableItem
  rightActions={[
    {
      type: 'custom',
      label: 'Block',
      icon: 'ban',
      color: '#FF0000',
      onPress: () => blockUser(id)
    }
  ]}
>
  <UserCard user={user} />
</SwipeableItem>
```

## API

### Components

- `SwipeableItem`: Main swipeable wrapper component
- `SwipeActionButton`: Individual swipe action button

### Hooks

- `useSwipeActions()`: Hook for creating common swipe actions

## License

MIT


/**
 * Swipe Actions Domain - Barrel Export
 *
 * Public API for the swipe-actions domain.
 * Provides iOS Mail-style swipe-to-reveal actions for list items.
 *
 * Features:
 * - Pre-built action types (delete, archive, edit, share, favorite, more)
 * - Custom actions with icon, label, color
 * - Haptic feedback integration
 * - Theme-aware colors from design-system
 * - Smooth animations with Reanimated v3
 * - Left and right swipe support
 * - Offline-compatible (100% client-side)
 *
 * Usage:
 * ```tsx
 * import { SwipeableItem, useSwipeActions } from '@umituz/react-native-swipe-actions';
 *
 * const MyList = () => {
 *   const { createDeleteAction, createArchiveAction } = useSwipeActions();
 *
 *   return (
 *     <SwipeableItem
 *       leftActions={[createArchiveAction(() => archiveItem(id))]}
 *       rightActions={[createDeleteAction(() => deleteItem(id))]}
 *     >
 *       <ListItem title="My Item" />
 *     </SwipeableItem>
 *   );
 * };
 *
 * // Custom action
 * <SwipeableItem
 *   rightActions={[
 *     {
 *       type: 'custom',
 *       label: 'Block',
 *       icon: 'ban',
 *       color: '#FF0000',
 *       onPress: () => blockUser(id)
 *     }
 *   ]}
 * >
 *   <UserCard user={user} />
 * </SwipeableItem>
 * ```
 */

// Domain Entities
export type {
  SwipeActionType,
  SwipeActionConfig,
  SwipeDirection,
  SwipeableConfig,
} from './domain/entities/SwipeAction';

export {
  ACTION_PRESETS,
  DEFAULT_SWIPE_CONFIG,
  SwipeActionUtils,
} from './domain/entities/SwipeAction';

// Presentation Components
export {
  SwipeableItem,
  type SwipeableItemProps,
} from './presentation/components/SwipeableItem';

export {
  SwipeActionButton,
  type SwipeActionButtonProps,
} from './presentation/components/SwipeActionButton';

// Presentation Hooks
export {
  useSwipeActions,
  type UseSwipeActionsReturn,
} from './presentation/hooks/useSwipeActions';

/**
 * Swipe Actions Domain - useSwipeActions Hook
 *
 * React hook providing common swipe action handlers.
 * Simplifies implementation of delete, archive, edit patterns.
 *
 * @domain swipe-actions
 * @layer presentation/hooks
 */

import { useCallback } from 'react';
import type { SwipeActionConfig } from '../../domain/entities/SwipeAction';

/**
 * Common swipe action handlers
 */
export interface UseSwipeActionsReturn {
  /** Creates delete action configuration */
  createDeleteAction: (onDelete: () => void | Promise<void>) => SwipeActionConfig;
  /** Creates archive action configuration */
  createArchiveAction: (onArchive: () => void | Promise<void>) => SwipeActionConfig;
  /** Creates edit action configuration */
  createEditAction: (onEdit: () => void | Promise<void>) => SwipeActionConfig;
  /** Creates share action configuration */
  createShareAction: (onShare: () => void | Promise<void>) => SwipeActionConfig;
  /** Creates favorite action configuration */
  createFavoriteAction: (onFavorite: () => void | Promise<void>) => SwipeActionConfig;
  /** Creates more action configuration */
  createMoreAction: (onMore: () => void | Promise<void>) => SwipeActionConfig;
}

/**
 * useSwipeActions Hook
 *
 * Provides factory methods for creating common swipe actions.
 * Simplifies action configuration with sensible defaults.
 *
 * USAGE:
 * ```typescript
 * import { useSwipeActions } from '@domains/swipe-actions';
 *
 * const MyList = () => {
 *   const { createDeleteAction, createArchiveAction } = useSwipeActions();
 *
 *   const handleDelete = async (id: string) => {
 *     await deleteItem(id);
 *   };
 *
 *   const handleArchive = async (id: string) => {
 *     await archiveItem(id);
 *   };
 *
 *   return (
 *     <SwipeableItem
 *       leftActions={[createArchiveAction(() => handleArchive(item.id))]}
 *       rightActions={[createDeleteAction(() => handleDelete(item.id))]}
 *     >
 *       <ListItem item={item} />
 *     </SwipeableItem>
 *   );
 * };
 * ```
 *
 * @returns Common action factory methods
 */
export const useSwipeActions = (): UseSwipeActionsReturn => {
  /**
   * Creates delete action
   */
  const createDeleteAction = useCallback((onDelete: () => void | Promise<void>): SwipeActionConfig => {
    return {
      type: 'delete',
      onPress: onDelete,
      enableHaptics: true,
    };
  }, []);

  /**
   * Creates archive action
   */
  const createArchiveAction = useCallback((onArchive: () => void | Promise<void>): SwipeActionConfig => {
    return {
      type: 'archive',
      onPress: onArchive,
      enableHaptics: true,
    };
  }, []);

  /**
   * Creates edit action
   */
  const createEditAction = useCallback((onEdit: () => void | Promise<void>): SwipeActionConfig => {
    return {
      type: 'edit',
      onPress: onEdit,
      enableHaptics: true,
    };
  }, []);

  /**
   * Creates share action
   */
  const createShareAction = useCallback((onShare: () => void | Promise<void>): SwipeActionConfig => {
    return {
      type: 'share',
      onPress: onShare,
      enableHaptics: true,
    };
  }, []);

  /**
   * Creates favorite action
   */
  const createFavoriteAction = useCallback((onFavorite: () => void | Promise<void>): SwipeActionConfig => {
    return {
      type: 'favorite',
      onPress: onFavorite,
      enableHaptics: true,
    };
  }, []);

  /**
   * Creates more action
   */
  const createMoreAction = useCallback((onMore: () => void | Promise<void>): SwipeActionConfig => {
    return {
      type: 'more',
      onPress: onMore,
      enableHaptics: true,
    };
  }, []);

  return {
    createDeleteAction,
    createArchiveAction,
    createEditAction,
    createShareAction,
    createFavoriteAction,
    createMoreAction,
  };
};

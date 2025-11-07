/**
 * Swipe Actions Domain - SwipeableItem Component
 *
 * Main swipeable wrapper component using ReanimatedSwipeable.
 * Provides iOS Mail-style swipe-to-reveal actions.
 *
 * @domain swipe-actions
 * @layer presentation/components
 */

import React, { useRef } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SwipeActionButton } from './SwipeActionButton';
import type { SwipeableConfig } from '../../domain/entities/SwipeAction';
import { DEFAULT_SWIPE_CONFIG } from '../../domain/entities/SwipeAction';

/**
 * SwipeableItem component props
 */
export interface SwipeableItemProps extends SwipeableConfig {
  /** Child content to render */
  children: React.ReactNode;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Callback when swipe begins */
  onSwipeBegin?: (direction: 'left' | 'right') => void;
  /** Callback when swipe ends */
  onSwipeEnd?: () => void;
}

/**
 * SwipeableItem Component
 *
 * Wraps content with swipe-to-reveal actions.
 * Supports left actions (swipe right) and right actions (swipe left).
 *
 * USAGE:
 * ```typescript
 * import { SwipeableItem } from '@domains/swipe-actions';
 *
 * <SwipeableItem
 *   rightActions={[
 *     { type: 'delete', onPress: () => deleteItem(id) }
 *   ]}
 *   leftActions={[
 *     { type: 'archive', onPress: () => archiveItem(id) }
 *   ]}
 * >
 *   <ListItem title="My Item" />
 * </SwipeableItem>
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
export const SwipeableItem: React.FC<SwipeableItemProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  threshold = DEFAULT_SWIPE_CONFIG.threshold,
  disableOvershoot = DEFAULT_SWIPE_CONFIG.disableOvershoot,
  friction = DEFAULT_SWIPE_CONFIG.friction,
  style,
  onSwipeBegin,
  onSwipeEnd,
}) => {
  const swipeableRef = useRef<Swipeable>(null);

  /**
   * Render left actions (revealed when swiping right)
   */
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    drag: Animated.AnimatedInterpolation<number>
  ) => {
    if (leftActions.length === 0) {
      return null;
    }

    return (
      <View style={styles.actionsContainer}>
        {leftActions.map((action, index) => (
          <SwipeActionButton
            key={`left-${index}`}
            action={action}
            position={index}
            totalActions={leftActions.length}
            direction="left"
          />
        ))}
      </View>
    );
  };

  /**
   * Render right actions (revealed when swiping left)
   */
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    drag: Animated.AnimatedInterpolation<number>
  ) => {
    if (rightActions.length === 0) {
      return null;
    }

    return (
      <View style={styles.actionsContainer}>
        {rightActions.map((action, index) => (
          <SwipeActionButton
            key={`right-${index}`}
            action={action}
            position={index}
            totalActions={rightActions.length}
            direction="right"
          />
        ))}
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      containerStyle={[styles.container, style]}
      friction={friction}
      overshootLeft={!disableOvershoot}
      overshootRight={!disableOvershoot}
      leftThreshold={threshold}
      rightThreshold={threshold}
      renderLeftActions={leftActions.length > 0 ? renderLeftActions : undefined}
      renderRightActions={rightActions.length > 0 ? renderRightActions : undefined}
      onSwipeableWillOpen={(direction: 'left' | 'right') => {
        onSwipeBegin?.(direction);
      }}
      onSwipeableClose={() => {
        onSwipeEnd?.();
      }}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

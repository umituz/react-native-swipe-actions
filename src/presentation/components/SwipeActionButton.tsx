/**
 * Swipe Actions Domain - SwipeActionButton Component
 *
 * Individual swipe action button with icon and label.
 * Rendered inside SwipeableItem when swiping.
 *
 * @domain swipe-actions
 * @layer presentation/components
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, type StyleProp, type ViewStyle } from 'react-native';
import { AtomicText } from '@umituz/react-native-design-system-atoms';
import { useAppDesignTokens } from '@umituz/react-native-design-system-theme';
import { Ionicons } from '@expo/vector-icons';
import { HapticService } from '@umituz/react-native-haptics';
import type { SwipeActionConfig } from '../../domain/entities/SwipeAction';
import { SwipeActionUtils } from '../../domain/entities/SwipeAction';

/**
 * SwipeActionButton component props
 */
export interface SwipeActionButtonProps {
  /** Action configuration */
  action: SwipeActionConfig;
  /** Action position (index) */
  position: number;
  /** Total actions count */
  totalActions: number;
  /** Swipe direction */
  direction: 'left' | 'right';
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * SwipeActionButton Component
 *
 * Displays an individual swipe action with icon and label.
 * Animates based on swipe progress.
 *
 * USAGE:
 * ```typescript
 * // Used internally by SwipeableItem
 * <SwipeActionButton
 *   action={deleteAction}
 *   progress={progressValue}
 *   drag={dragValue}
 *   position={0}
 *   totalActions={1}
 *   direction="right"
 * />
 * ```
 */
export const SwipeActionButton: React.FC<SwipeActionButtonProps> = ({
  action,
  position,
  totalActions,
  direction,
  style,
}) => {
  const tokens = useAppDesignTokens();

  // Get action properties
  const label = SwipeActionUtils.getLabel(action);
  const iconName = SwipeActionUtils.getIcon(action);
  const colorKey = SwipeActionUtils.getColorKey(action);
  const customColor = action.color;
  const enableHaptics = action.enableHaptics !== false;

  // Map Lucide icon names to Ionicons names
  const iconMap: Record<string, string> = {
    'Trash2': 'trash-outline',
    'Archive': 'archive-outline',
    'Pencil': 'pencil-outline',
    'Share2': 'share-outline',
    'Heart': 'heart-outline',
    'MoveHorizontal': 'ellipsis-horizontal-outline',
  };
  
  const icon = iconMap[iconName] || 'ellipsis-horizontal-outline';

  // Get background color from theme or custom
  const backgroundColor = customColor || (colorKey ? (tokens.colors[colorKey as keyof typeof tokens.colors] as string) : tokens.colors.primary);

  const handlePress = async () => {
    // Trigger haptic feedback
    if (enableHaptics) {
      const intensity = SwipeActionUtils.getHapticsIntensity(action);
      if (intensity === 'Light') {
        await HapticService.impact('Light');
      } else if (intensity === 'Medium') {
        await HapticService.impact('Medium');
      } else {
        await HapticService.impact('Heavy');
      }
    }

    // Execute action
    await action.onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor,
          paddingHorizontal: tokens.spacing.lg,
          minWidth: 80,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Ionicons
          name={icon as any}
          size={24}
          color="#FFFFFF"
        />
        <AtomicText
          type="bodySmall"
          style={[styles.label, { color: '#FFFFFF' }]}
        >
          {label}
        </AtomicText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    textAlign: 'center',
  },
});

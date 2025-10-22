// app/components/ui/LoaderOverlay.tsx
import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Animated,
    Easing,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

type LoaderOverlayProps = {
    /** Show/hide the loader */
    visible: boolean;
    /** Fullscreen (covers entire screen) or inline (fits parent) */
    variant?: 'fullscreen' | 'inline';
    /** Optional loading message */
    message?: string;
    /** Spinner size */
    size?: 'small' | 'large' | number;
    /** Spinner color */
    color?: string;
    /** Backdrop color (only for fullscreen) */
    backdropColor?: string;
    /** Backdrop opacity 0–1 (only for fullscreen) */
    backdropOpacity?: number;
    /** Container style override (useful for inline variant) */
    style?: StyleProp<ViewStyle>;
};

/**
 * LoaderOverlay
 * - Smooth fade in/out
 * - Fullscreen glass-backdrop or inline container
 * - Optional message text
 *
 * Usage:
 * <LoaderOverlay visible={isLoading} variant="fullscreen" message="Učitavanje..." />
 * <LoaderOverlay visible={isLoading} variant="inline" style={{ height: 120 }} />
 */
const LoaderOverlay: React.FC<LoaderOverlayProps> = ({
    visible,
    variant = 'fullscreen',
    message,
    size = 'large',
    color = '#ffffff',
    backdropColor = '#000000',
    backdropOpacity = 0.25,
    style,
}) => {
    // Fade animation for mounting/unmounting
    const opacity = useRef(new Animated.Value(0)).current;

    const mountRef = useRef(visible);
    if (visible) mountRef.current = true;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: visible ? 1 : 0,
            duration: visible ? 160 : 140,
            easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
            useNativeDriver: true,
        }).start(({ finished }) => {
            if (finished && !visible) {
                mountRef.current = false;
            }
        });
    }, [visible, opacity]);

    if (!mountRef.current && !visible) return null;

    const isFullscreen = variant === 'fullscreen';

    return (
        <Animated.View
            pointerEvents={visible ? 'auto' : 'none'}
            style={[
                isFullscreen ? styles.fullscreen : styles.inline,
                isFullscreen && {
                    backgroundColor: hexWithOpacity(backdropColor, backdropOpacity),
                },
                { opacity },
                style,
            ]}
        >
            <View style={styles.card}>
                <ActivityIndicator size={size} color={color} />
                {!!message && <Text style={styles.message}>{message}</Text>}
            </View>
        </Animated.View>
    );
};

export default LoaderOverlay;

function hexWithOpacity(hex: string, alpha: number) {
    if (!hex.startsWith('#')) return applyAlphaToRgba(hex, alpha);

    const clean = hex.replace('#', '');
    const full =
        clean.length === 3
            ? clean
                  .split('')
                  .map((c) => c + c)
                  .join('')
            : clean.padEnd(6, '0');

    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

function applyAlphaToRgba(color: string, alpha: number) {
    const a = clamp(alpha, 0, 1);
    const rgbaMatch = color.match(
        /^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)$/i,
    );
    if (!rgbaMatch) return color;

    const r = rgbaMatch[1];
    const g = rgbaMatch[2];
    const b = rgbaMatch[3];
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

const styles = StyleSheet.create({
    fullscreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inline: {
        width: '100%',
        height: '100%',
        minHeight: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        minWidth: 96,
        minHeight: 96,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(28, 28, 28, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    message: {
        marginTop: 6,
        fontSize: 14,
        color: '#ffffff',
    },
});

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AnswerButtonProps {
  text: string;
  color?: 'blue' | 'red' | 'orange' | 'green';
  variant?: 'default' | 'correct' | 'wrong' | 'faded' | 'warning';
  onPress?: () => void;
  disabled?: boolean;
  showIcon?: boolean;
  iconType?: 'check' | 'close';
}

export default function AnswerButton({
  text,
  color,
  variant = 'default',
  onPress,
  disabled = false,
  showIcon = false,
  iconType,
}: AnswerButtonProps) {
  let style = styles.default;
  let icon = null;
  if (color === 'blue') style = styles.blue;
  else if (color === 'red') style = styles.red;
  else if (color === 'orange') style = styles.orange;
  else if (color === 'green') style = styles.green;
  else if (variant === 'correct') {
    style = styles.green;
    if (showIcon && iconType === 'check') icon = <Ionicons name="checkmark-circle" size={24} color="#fff" style={{marginLeft: 8}} />;
  } else if (variant === 'wrong') {
    style = styles.red;
    if (showIcon && iconType === 'close') icon = <Ionicons name="close-circle" size={24} color="#fff" style={{marginLeft: 8}} />;
  } else if (variant === 'faded') {
    style = styles.faded;
  } else if (variant === 'warning') {
    style = styles.orange;
  }

  const Comp = onPress ? TouchableOpacity : View;
  return (
    <Comp
      style={[styles.base, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{text}</Text>
      {icon}
    </Comp>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    marginVertical: 10,
    width: 340,
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 4,
  },
  default: {
    backgroundColor: '#285ecc',
  },
  blue: {
    backgroundColor: '#285ecc',
  },
  red: {
    backgroundColor: '#f75555',
  },
  orange: {
    backgroundColor: '#ffb300',
  },
  green: {
    backgroundColor: '#00b676',
  },
  faded: {
    backgroundColor: '#e0e0e0',
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
}); 
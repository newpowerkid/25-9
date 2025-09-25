'use client'

import React from 'react'
import { cn } from '~/lib/utils'

// Base glass styles
const glassStyles = {
    base: "backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl",
    card: "backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl",
    button: "backdrop-blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 hover:from-purple-500/30 hover:to-pink-500/30 hover:scale-105 transition-all duration-300",
    input: "backdrop-blur-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300",
    modal: "backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl",
}

// GlassCard Component
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    variant?: 'default' | 'elevated' | 'subtle'
}

export function GlassCard({ children, className, variant = 'default', ...props }: GlassCardProps) {
    const variants = {
        default: glassStyles.card,
        elevated: `${glassStyles.card} shadow-3xl`,
        subtle: `${glassStyles.base} rounded-xl`,
    }

    return (
        <div className={cn(variants[variant], className)} {...props}>
            {children}
        </div>
    )
}

// GlassButton Component
interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: 'default' | 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
}

export function GlassButton({
    children,
    className,
    variant = 'default',
    size = 'md',
    ...props
}: GlassButtonProps) {
    const variants = {
        default: glassStyles.button,
        primary: `${glassStyles.button} from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30`,
        secondary: `${glassStyles.button} from-gray-500/20 to-slate-500/20 hover:from-gray-500/30 hover:to-slate-500/30`,
        danger: `${glassStyles.button} from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30`,
    }

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
    }

    return (
        <button
            className={cn(
                variants[variant],
                sizes[size],
                'rounded-xl font-medium text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

// GlassInput Component
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function GlassInput({ className, label, ...props }: GlassInputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-slate-300 font-medium text-sm">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    glassStyles.input,
                    'w-full p-3 rounded-xl text-white placeholder-slate-400',
                    className
                )}
                {...props}
            />
        </div>
    )
}

// GlassModal Component
interface GlassModalProps {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
    title?: string
    className?: string
}

export function GlassModal({ children, isOpen, onClose, title, className }: GlassModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={cn(glassStyles.modal, 'w-full max-w-4xl max-h-[90vh] overflow-y-auto', className)}>
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                )}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

// GlassContainer Component
interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function GlassContainer({ children, className, ...props }: GlassContainerProps) {
    return (
        <div className={cn('min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6', className)} {...props}>
            {children}
        </div>
    )
}

// GlassNavigation Component
interface GlassNavigationProps {
    children: React.ReactNode
    className?: string
}

export function GlassNavigation({ children, className }: GlassNavigationProps) {
    return (
        <nav className={cn(glassStyles.card, 'p-4', className)}>
            {children}
        </nav>
    )
}

// GlassSwitcher Component
interface GlassSwitcherProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
    className?: string
}

export function GlassSwitcher({ checked, onChange, label, className }: GlassSwitcherProps) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <button
                onClick={() => onChange(!checked)}
                className={cn(
                    'relative w-12 h-6 rounded-full transition-all duration-300',
                    checked
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-white/10 border border-white/20'
                )}
            >
                <div
                    className={cn(
                        'absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300',
                        checked ? 'left-7' : 'left-1'
                    )}
                />
            </button>
            {label && <span className="text-slate-300">{label}</span>}
        </div>
    )
}

// GlassSlider Component
interface GlassSliderProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    label?: string
    className?: string
}

export function GlassSlider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    className
}: GlassSliderProps) {
    return (
        <div className={cn('space-y-2', className)}>
            {label && <label className="block text-slate-300 font-medium text-sm">{label}</label>}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-right text-slate-400 text-sm">{value}</div>
        </div>
    )
}

// GlassProgress Component
interface GlassProgressProps {
    value: number
    max?: number
    className?: string
    label?: string
}

export function GlassProgress({ value, max = 100, className, label }: GlassProgressProps) {
    const percentage = (value / max) * 100

    return (
        <div className={cn('space-y-2', className)}>
            {label && <label className="block text-slate-300 font-medium text-sm">{label}</label>}
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="text-right text-slate-400 text-sm">{value}/{max}</div>
        </div>
    )
}

// GlassToggle Component
interface GlassToggleProps {
    pressed: boolean
    onPressedChange: (pressed: boolean) => void
    children: React.ReactNode
    className?: string
}

export function GlassToggle({ pressed, onPressedChange, children, className }: GlassToggleProps) {
    return (
        <button
            onClick={() => onPressedChange(!pressed)}
            className={cn(
                glassStyles.button,
                pressed && 'from-purple-500/40 to-pink-500/40',
                'rounded-xl px-4 py-2 font-medium text-white',
                className
            )}
        >
            {children}
        </button>
    )
}

// GlassCheckbox Component
interface GlassCheckboxProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label?: string
    className?: string
}

export function GlassCheckbox({ checked, onChange, label, className }: GlassCheckboxProps) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <button
                onClick={() => onChange(!checked)}
                className={cn(
                    'w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center',
                    checked
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
                        : 'border-white/30 bg-white/5'
                )}
            >
                {checked && <span className="text-white text-xs">✓</span>}
            </button>
            {label && <span className="text-slate-300">{label}</span>}
        </div>
    )
}

// GlassRadio Component
interface GlassRadioProps {
    checked: boolean
    onChange: () => void
    label?: string
    className?: string
}

export function GlassRadio({ checked, onChange, label, className }: GlassRadioProps) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <button
                onClick={onChange}
                className={cn(
                    'w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center',
                    checked
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500'
                        : 'border-white/30 bg-white/5'
                )}
            >
                {checked && <div className="w-2 h-2 bg-white rounded-full" />}
            </button>
            {label && <span className="text-slate-300">{label}</span>}
        </div>
    )
}
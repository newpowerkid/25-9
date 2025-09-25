"use client";

import React, { useState } from "react";
import {
  GlassCard,
  GlassButton,
  GlassNavigation,
  GlassInput,
  GlassModal,
  GlassContainer,
  GlassSwitcher,
  GlassSlider,
  GlassProgress,
  GlassToggle,
  GlassCheckbox,
  GlassRadio,
} from "../../components/ui/liquid-glass";

export default function LiquidGlassDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("home");
  const [switcherTheme, setSwitcherTheme] = useState<"light" | "dark" | "dim">(
    "light"
  );
  const [sliderValue, setSliderValue] = useState(30);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [radioValue, setRadioValue] = useState("red");

  const themes = [
    { id: "light", name: "Light", icon: "☀️" },
    { id: "dark", name: "Dark", icon: "🌙" },
    { id: "blue", name: "Blue", icon: "💙" },
    { id: "purple", name: "Purple", icon: "💜" },
    { id: "green", name: "Green", icon: "💚" },
    { id: "pink", name: "Pink", icon: "💗" },
  ];

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "ℹ️" },
    { id: "services", label: "Services", icon: "⚙️" },
    { id: "contact", label: "Contact", icon: "📞" },
  ];

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 p-4">
      {/* Header */}
      <GlassContainer className="mb-8" floating glow>
        <div className="glass-flex glass-items-center glass-justify-between">
          <div>
            <h1 className="text-3xl font-bold glass-text-primary mb-2">
              Apple Liquid Glass UI
            </h1>
            <p className="glass-text-secondary">
              iOS 26 Style Components & Animations
            </p>
          </div>

          <div className="glass-flex glass-gap-2">
            {themes.map((theme) => (
              <GlassButton
                key={theme.id}
                variant={currentTheme === theme.id ? "primary" : "default"}
                size="sm"
                onClick={() => handleThemeChange(theme.id)}
                icon={theme.icon}
              >
                {theme.name}
              </GlassButton>
            ))}
          </div>
        </div>
      </GlassContainer>

      {/* Navigation */}
      <GlassNavigation
        items={navItems.map((item) => ({
          ...item,
          active: activeTab === item.id,
        }))}
        onItemClick={(item: any) => setActiveTab(item.id)}
        className="mb-8"
      />

      {/* Demo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Basic Glass Card */}
        <GlassCard
          title="Basic Glass Card"
          subtitle="Simple glass effect with title"
          hover
        >
          <p className="glass-text-secondary mb-4">
            This is a basic glass card with the liquid glass effect. It includes
            backdrop blur, transparency, and subtle borders.
          </p>
          <GlassButton variant="primary" size="sm">
            Learn More
          </GlassButton>
        </GlassCard>
        {/* SVG filter for slider thumb liquid-lens effect */}
        <svg width="0" height="0" aria-hidden>
          <filter
            id="mini-liquid-lens"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feImage
              x="0"
              y="0"
              result="normalMap"
              href={`data:image/svg+xml;utf8,
              <svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
                <radialGradient id='invmap' cx='50%' cy='50%' r='75%'>
                  <stop offset='0%' stop-color='rgb(128,128,255)'/>
                  <stop offset='90%' stop-color='rgb(255,255,255)'/>
                </radialGradient>
                <rect width='100%' height='100%' fill='url(#invmap)'/>
              </svg>`}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="normalMap"
              scale="-252"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feMerge>
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>
        </svg>

        {/* Tinted Glass Card */}
        <GlassCard
          title="Tinted Glass"
          subtitle="Glass with color tinting"
          tint="blue"
          glow
        >
          <p className="glass-text-secondary mb-4">
            This card uses a blue tint to create a colored glass effect while
            maintaining the liquid glass appearance.
          </p>
          <div className="glass-flex glass-gap-2">
            <GlassButton variant="success" size="sm">
              Accept
            </GlassButton>
            <GlassButton variant="default" size="sm">
              Cancel
            </GlassButton>
          </div>
        </GlassCard>

        {/* Clear Glass Card */}
        <GlassCard
          title="Clear Glass"
          subtitle="Maximum transparency"
          variant="clear"
          floating
        >
          <p className="glass-text-secondary mb-4">
            Clear glass variant with maximum transparency for subtle background
            visibility.
          </p>
          <GlassButton variant="danger" size="sm" ripple>
            Delete
          </GlassButton>
        </GlassCard>

        {/* Interactive Elements */}
        <GlassCard title="Interactive Elements">
          <div className="space-y-4">
            <GlassInput
              label="Email Address"
              placeholder="Enter your email"
              icon="📧"
            />
            <GlassInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon="🔒"
            />
            <GlassButton
              variant="primary"
              className="w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </GlassButton>
          </div>
        </GlassCard>

        {/* Button Variants */}
        <GlassCard title="Button Variants">
          <div className="glass-flex glass-flex-col glass-gap-2">
            <GlassButton variant="default">Default Button</GlassButton>
            <GlassButton variant="primary">Primary Button</GlassButton>
            <GlassButton variant="secondary">Secondary Button</GlassButton>
            <GlassButton variant="success">Success Button</GlassButton>
            <GlassButton variant="danger">Danger Button</GlassButton>
          </div>
        </GlassCard>

        {/* Loading States */}
        <GlassCard title="Loading States">
          <div className="glass-flex glass-flex-col glass-gap-2">
            <GlassButton loading>Loading Button</GlassButton>
            <GlassButton variant="primary" loading>
              Primary Loading
            </GlassButton>
            <GlassButton variant="success" loading>
              Success Loading
            </GlassButton>
          </div>
        </GlassCard>

        {/* Animation Examples */}
        <GlassCard title="Animations" className="col-span-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassContainer className="glass-p-4 glass-text-center" morph glow>
              <div className="text-2xl mb-2">✨</div>
              <p className="text-sm">Morph & Glow</p>
            </GlassContainer>

            <GlassContainer className="glass-p-4 glass-text-center" floating>
              <div className="text-2xl mb-2">🎈</div>
              <p className="text-sm">Floating</p>
            </GlassContainer>

            <GlassContainer className="glass-p-4 glass-text-center glass-shimmer">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-sm">Shimmer</p>
            </GlassContainer>

            <GlassContainer className="glass-p-4 glass-text-center glass-pulse">
              <div className="text-2xl mb-2">💫</div>
              <p className="text-sm">Pulse</p>
            </GlassContainer>
          </div>
        </GlassCard>

        {/* Enhanced Liquid Glass Toggle Showcase */}
        <GlassCard
          title="Liquid Glass Toggle Showcase"
          className="col-span-full"
        >
          <div className="space-y-8">
            {/* Basic Toggle */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold glass-text-primary">
                Basic Toggle
              </h3>
              <div className="glass-flex glass-items-center glass-gap-6">
                <GlassToggle
                  checked={toggleChecked}
                  onChange={(checked: boolean) => setToggleChecked(checked)}
                  label={toggleChecked ? "Enabled" : "Disabled"}
                  size="md"
                />
                <GlassToggle
                  checked={!toggleChecked}
                  onChange={() => {}}
                  label="Disabled State"
                  disabled
                  size="md"
                />
              </div>
            </div>

            {/* Size Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold glass-text-primary">
                Size Variants
              </h3>
              <div className="glass-flex glass-items-center glass-gap-6">
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Small"
                  size="sm"
                  variant="blue"
                />
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Medium"
                  size="md"
                  variant="purple"
                />
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Large"
                  size="lg"
                  variant="green"
                />
              </div>
            </div>

            {/* Color Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold glass-text-primary">
                Color Variants
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Default"
                  variant="default"
                  size="md"
                />
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Blue"
                  variant="blue"
                  size="md"
                />
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Purple"
                  variant="purple"
                  size="md"
                />
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Green"
                  variant="green"
                  size="md"
                />
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Pink"
                  variant="pink"
                  size="md"
                />
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Orange"
                  variant="orange"
                  size="md"
                />
                <GlassToggle
                  checked={true}
                  onChange={() => {}}
                  label="Red"
                  variant="red"
                  size="md"
                />
              </div>
            </div>

            {/* Advanced Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold glass-text-primary">
                Advanced Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <GlassToggle
                    checked={true}
                    onChange={() => {}}
                    label="With Icon (Left)"
                    icon="🔔"
                    iconPosition="left"
                    variant="blue"
                    size="md"
                  />
                  <GlassToggle
                    checked={false}
                    onChange={() => {}}
                    label="With Icon (Right)"
                    icon="⚡"
                    iconPosition="right"
                    variant="purple"
                    size="md"
                  />
                  <GlassToggle
                    checked={true}
                    onChange={() => {}}
                    label="No Icon"
                    showIcon={false}
                    variant="green"
                    size="md"
                  />
                </div>
                <div className="space-y-3">
                  <GlassToggle
                    checked={true}
                    onChange={() => {}}
                    label="Morphing Effect"
                    morphing={true}
                    liquidEffect={true}
                    variant="pink"
                    size="md"
                  />
                  <GlassToggle
                    checked={false}
                    onChange={() => {}}
                    label="No Liquid Effect"
                    liquidEffect={false}
                    variant="orange"
                    size="md"
                  />
                  <GlassToggle
                    checked={true}
                    onChange={() => {}}
                    label="All Effects"
                    morphing={true}
                    liquidEffect={true}
                    icon="✨"
                    variant="red"
                    size="lg"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold glass-text-primary">
                Interactive Demo
              </h3>
              <div className="glass-flex glass-items-center glass-gap-6">
                <GlassToggle
                  checked={toggleChecked}
                  onChange={(checked: boolean) => setToggleChecked(checked)}
                  label={
                    toggleChecked ? "Notifications ON" : "Notifications OFF"
                  }
                  icon={toggleChecked ? "🔔" : "🔕"}
                  variant="blue"
                  size="lg"
                  morphing={true}
                  liquidEffect={true}
                />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Other Controls */}
        <GlassCard title="Other Controls">
          <div className="space-y-4">
            <div className="glass-flex glass-items-center glass-gap-4">
              <div className="w-1/2">
                <label className="glass-text-secondary">Theme Switcher</label>
                <GlassSwitcher
                  value={switcherTheme}
                  onChange={(val: "light" | "dark" | "dim") => {
                    setSwitcherTheme(val);
                    handleThemeChange(val);
                  }}
                  label={`Theme: ${switcherTheme}`}
                />
              </div>

              <div className="w-1/2">
                <label className="glass-text-secondary">Slider</label>
                <GlassSlider
                  value={sliderValue}
                  min={0}
                  max={100}
                  onChange={(val: number) => setSliderValue(val)}
                  showValue
                />
              </div>
            </div>

            <div className="glass-flex glass-items-center glass-gap-4">
              <div className="w-1/2">
                <label className="glass-text-secondary">Progress</label>
                <GlassProgress value={sliderValue} max={100} />
              </div>

              <div className="w-1/2">
                <label className="glass-text-secondary">Checkbox</label>
                <GlassCheckbox
                  label="Subscribe"
                  checked={checkboxChecked}
                  onChange={(checked: boolean) => setCheckboxChecked(checked)}
                />
              </div>
            </div>

            <div className="glass-flex glass-items-center glass-gap-4">
              <div className="w-full">
                <label className="glass-text-secondary">Radio</label>
                <div className="glass-flex glass-gap-2">
                  <GlassRadio
                    name="color"
                    value="red"
                    label="Red"
                    checked={radioValue === "red"}
                    onChange={(val: string) => setRadioValue(val)}
                  />
                  <GlassRadio
                    name="color"
                    value="blue"
                    label="Blue"
                    checked={radioValue === "blue"}
                    onChange={(val: string) => setRadioValue(val)}
                  />
                  <GlassRadio
                    name="color"
                    value="green"
                    label="Green"
                    checked={radioValue === "green"}
                    onChange={(val: string) => setRadioValue(val)}
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Modal Example */}
      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Liquid Glass Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="glass-text-secondary">
            This is a liquid glass modal with the same glass effect applied. It
            includes backdrop blur and smooth animations.
          </p>

          <GlassInput
            label="Full Name"
            placeholder="Enter your full name"
            icon="👤"
          />

          <GlassInput
            label="Message"
            placeholder="Enter your message"
            icon="💬"
          />

          <div className="glass-flex glass-gap-2 glass-justify-end">
            <GlassButton
              variant="default"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </GlassButton>
            <GlassButton
              variant="primary"
              onClick={() => setIsModalOpen(false)}
            >
              Submit
            </GlassButton>
          </div>
        </div>
      </GlassModal>

      {/* Footer */}
      <GlassContainer className="glass-text-center">
        <p className="glass-text-secondary mb-2">
          Built with Apple Liquid Glass Design System
        </p>
        <p className="glass-text-tertiary text-sm">
          Inspired by iOS 26 & WWDC 2025
        </p>
      </GlassContainer>
    </div>
  );
}

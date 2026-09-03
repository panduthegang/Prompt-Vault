import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, LucideIcon } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  badge?: string;
  description?: string;
}

export interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  label,
  disabled = false,
  className = '',
  dropdownClassName = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  // Find selected option
  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Sync highlightedIndex with selected option when opened
  useEffect(() => {
    if (isOpen) {
      const idx = options.findIndex((opt) => opt.value === value);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [isOpen, value, options]);

  // Scroll highlighted item into view if list is long
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const itemElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (itemElement) {
        itemElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < options.length) {
        onChange(options[highlightedIndex].value);
        setIsOpen(false);
      } else {
        setIsOpen((prev) => !prev);
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    } else if (e.key === 'Tab') {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  const handleSelectOption = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-30' : 'z-10'} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block font-sans text-xs font-bold uppercase tracking-wider text-vault-dark/70 mb-1.5"
        >
          {label}
        </label>
      )}

      {/* Select Trigger Button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        className={`w-full bg-white text-vault-dark border-2 border-vault-dark rounded-xl px-3.5 py-2.5 font-sans text-xs sm:text-sm flex items-center justify-between gap-2.5 transition-all text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-vault-green ${
          isOpen ? 'ring-2 ring-vault-green shadow-xs' : 'hover:border-vault-dark'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-vault-cream/50' : ''}`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {selectedOption?.icon && (
            <div className="p-1 rounded-md bg-vault-cream border border-vault-dark/15 shrink-0">
              <selectedOption.icon className="w-4 h-4 text-vault-dark" />
            </div>
          )}

          <span
            className={`truncate font-medium ${
              selectedOption ? 'text-vault-dark font-semibold' : 'text-vault-dark/40'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          {selectedOption?.badge && (
            <span className="hidden sm:inline-block ml-auto text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-vault-yellow text-vault-dark border border-vault-dark/20 shrink-0">
              {selectedOption.badge}
            </span>
          )}
        </div>

        {/* Animated Chevron Indicator */}
        <div className="shrink-0 text-vault-dark/60 transition-transform duration-200">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'rotate-180 text-vault-dark' : ''
            }`}
          />
        </div>
      </button>

      {/* Floating Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border-2 border-vault-dark rounded-xl shadow-2xl overflow-hidden py-1.5 ${dropdownClassName}`}
          >
            <ul
              ref={listRef}
              role="listbox"
              aria-activedescendant={
                highlightedIndex >= 0 ? `${id}-opt-${highlightedIndex}` : undefined
              }
              tabIndex={-1}
              className="max-h-60 overflow-y-auto no-scrollbar space-y-0.5 px-1 focus:outline-none"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    id={`${id}-opt-${index}`}
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectOption(option.value)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between gap-2.5 transition-all text-xs sm:text-sm font-sans ${
                      isSelected
                        ? 'bg-vault-dark text-vault-cream font-bold'
                        : isHighlighted
                        ? 'bg-vault-yellow/50 text-vault-dark font-medium'
                        : 'text-vault-dark/90 hover:bg-vault-yellow/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {option.icon && (
                        <div
                          className={`p-1 rounded-md border shrink-0 ${
                            isSelected
                              ? 'bg-vault-darker border-vault-cream/20 text-vault-yellow'
                              : 'bg-vault-cream border-vault-dark/15 text-vault-dark'
                          }`}
                        >
                          <option.icon className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div className="flex flex-col min-w-0">
                        <span className="truncate leading-snug">{option.label}</span>
                        {option.description && (
                          <span
                            className={`text-[10px] truncate ${
                              isSelected ? 'text-vault-cream/70' : 'text-vault-dark/50'
                            }`}
                          >
                            {option.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {option.badge && (
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                            isSelected
                              ? 'bg-vault-yellow text-vault-dark border-vault-yellow'
                              : 'bg-vault-yellow/40 text-vault-dark border-vault-dark/15'
                          }`}
                        >
                          {option.badge}
                        </span>
                      )}

                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-vault-green/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-vault-green stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

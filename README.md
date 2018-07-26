# stylelint-no-repeated-nesting

Prevent wrong nesting  of elements or modifiers inside one another.

## Installation and usage

```
yarn add --dev stylelint-no-repeated-nesting
```

Import the plugin in your `.stylelint.yml` configurationand set the rule:
```
plugins:
  - stylelint-no-repeated-nesting
```

## Rules

Set `blinkist/no-repeated-nesting` to `true` to enable the plugin.

```
rules:
  blinkist/no-repeated-nesting: true
```

The plugin will manage situations as follow:
```
.block {
  $root: &;

  &__element { // Right

    &__element-in-element { // Wrong
      display: block;
    }

    &--modifier-in-element { // Right
      display: block;
    }

    #{$root}--hello { // Right

      &__element { // Right
        display: block;
      }
    }
  }

  &--modifier { // Right

    &--modifier-in-modifier { // Wrong
      display: block;
    }

    &__element-in-modifier { // Wrong
      display: block;
    }
  }
}

```

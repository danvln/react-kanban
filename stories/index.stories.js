import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import defaultStory from "./Basics/defaultStory";

const storiesBasics = storiesOf("React Board|Basics", module);

storiesBasics.addDecorator(withKnobs);
storiesBasics.add("default", defaultStory);

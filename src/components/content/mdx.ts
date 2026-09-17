import MdxCallout from "./MdxCallout.astro";
import MdxDiagram from "./MdxDiagram.astro";
import MdxFlow from "./MdxFlow.astro";
import MdxFlowStep from "./MdxFlowStep.astro";
import MdxGallery from "./MdxGallery.astro";
import MdxImage from "./MdxImage.astro";
import MdxVideo from "./MdxVideo.astro";

export const mdxComponents = {
  Image: MdxImage,
  Video: MdxVideo,
  Callout: MdxCallout,
  Flow: MdxFlow,
  FlowStep: MdxFlowStep,
  Gallery: MdxGallery,
  Diagram: MdxDiagram,
};

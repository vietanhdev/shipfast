import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ProjectName = () => {
  const {
    siteConfig: {
      customFields: { projectName = 'ShipFast.dev' },
    },
  } = useDocusaurusContext();

  return projectName;
};

export default ProjectName;

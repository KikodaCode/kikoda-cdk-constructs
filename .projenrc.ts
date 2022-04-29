import { awscdk } from "projen";
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Timothy Harris",
  authorAddress: "timothy.harris@kikoda.com",
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  devContainer: true,
  docgen: true,
  name: "kikoda-cdk-constructs",
  prettier: true,
  projenrcTs: true,
  repositoryUrl: "https://github.com/KikodaCode/kikoda-cdk-constructs.git",
  vscode: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  packageName: "@kikoda/cdk-constructs",
});
project.synth();
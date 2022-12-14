import React, { useMemo } from "react";

import PostList from "../components/PostList/PostList";
import { graphql } from "gatsby";

import SideTagList from "../components/SideTagList/SideTagList";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import queryString from "query-string";

import { title, description, siteUrl } from "../../site-meta-config";

const Search = ({ location, data }) => {
  const posts = data.allMarkdownRemark.nodes

  const gatsbyImageData = data.file.childImageSharp.gatsbyImageData;
  
  const parsed = queryString.parse(location.search);

  const edges = data.allMarkdownRemark.edges;

  const selectedCategory =
    typeof parsed.category !== "string" || !parsed.category
      ? "All"
      : parsed.category;

  // const categoryList = useMemo(
  //   () =>
  //     edges.reduce(
  //       (
  //         list,
  //         {
  //           node: {
  //             frontmatter: { categories },
  //           },
  //         }
  //       ) => {
  //         categories.forEach((category) => {
  //           if (list[category] === undefined) list[category] = 1;
  //           else list[category]++;
  //         });

  //         list["All"]++;

  //         return list;
  //       },
  //       { All: 0 }
  //     ),
  //   []
  // );
  return (
    <Layout>
      <SEO title={title} description={description} url={siteUrl} />
      {/* <SideTagList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      /> */}
            <PostList postList={posts} />

    </Layout>
  );
};

export default Search;

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date, frontmatter___title]}
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          categories
          date
          summary
          title
          thumbnail {
            childImageSharp {
              gatsbyImageData(width: 768, height: 400)
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`;

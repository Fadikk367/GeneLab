import React from 'react';

import { PageWrapper, Headline } from 'common/components';
import { Image, Paragraph } from './About.css'

import examplePhoto1 from 'images/example-photo-1.jpg';
import examplePhoto2 from 'images/example-photo-2.jpg';


const About = () => {
  return (
    <PageWrapper maxWidth={1400}>
      <Headline>About page</Headline>
        <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius beatae, porro, quo reprehenderit quidem officia magnam incidunt repellat sit, aliquam iste cumque maxime soluta minus excepturi tempore libero itaque asperiores sunt quam vel iusto? Ut numquam itaque at doloremque unde eius esse. Ab, minus dolore. Eveniet debitis veniam molestiae dolore consequatur atque quasi tempora impedit! Accusamus quaerat reprehenderit a neque corporis ratione laborum laboriosam enim, suscipit ipsa quas ea necessitatibus.</Paragraph>
      <Image src={examplePhoto1} float='left' alt=""/>

      <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptate voluptatum officiis distinctio alias. Omnis vel itaque blanditiis pariatur quidem quis non reiciendis ducimus sint architecto optio quisquam totam aperiam voluptatibus facere ipsam delectus voluptatum, corporis, beatae eum id impedit. Ut, perferendis delectus. Est, nisi dolores. Molestiae eos aliquid, exercitationem sunt ducimus nesciunt numquam nulla nam sed nobis molestias esse perferendis? Perferendis commodi recusandae, provident fuga odio dolor eos repellendus.</Paragraph>
      <Image src={examplePhoto2} alt=""/>

    </PageWrapper>
  )
}

export default About;

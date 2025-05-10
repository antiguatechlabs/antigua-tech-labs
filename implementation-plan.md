# Implementation Plan for Landing Page Structure

## 1. Directory Structure

```
/src/app/
  ├── page.tsx
  ├── components/
  │   ├── Navbar.tsx
  │   ├── Hero.tsx
  │   ├── Features.tsx
  │   ├── Testimonials.tsx
  │   ├── Contact.tsx
  │   └── Footer.tsx
  └── data/
      ├── hero.json
      ├── features.json
      ├── testimonials.json
      └── contact.json

/src/lib/
  └── data.ts
```

## 2. Component Implementation

### Navbar.tsx
```typescript
"use client";
import { Box, Flex, Button, Heading, Spacer } from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Flex as="nav" p={4} alignItems="center" boxShadow="sm">
      <Heading size="md">Antigua Digital</Heading>
      <Spacer />
      <Box>
        <Button variant="ghost" mr={2}>Features</Button>
        <Button variant="ghost" mr={2}>Testimonials</Button>
        <Button variant="ghost" mr={2}>Pricing</Button>
        <Button colorScheme="teal">Contact</Button>
      </Box>
    </Flex>
  );
}
```

### Hero.tsx
```typescript
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import { getHeroContent } from '@/lib/data';

export default function Hero() {
  const content = getHeroContent();

  return (
    <Container centerContent py={20}>
      <Heading size="2xl">{content.title}</Heading>
      <Text fontSize="xl" mt={4}>{content.subtitle}</Text>
      <Button colorScheme="teal" size="lg" mt={6}>{content.cta}</Button>
    </Container>
  );
}
```

### Features.tsx
```typescript
import { Box, Container, Heading, SimpleGrid, Text, Icon, VStack } from '@chakra-ui/react';
import { getFeaturesContent } from '@/lib/data';

export default function Features() {
  const features = getFeaturesContent();

  return (
    <Box py={16} bg="gray.50">
      <Container maxW="container.xl">
        <Heading textAlign="center" mb={12}>{features.title}</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {features.items.map((feature, index) => (
            <VStack key={index} align="start" p={6} bg="white" borderRadius="md" boxShadow="sm">
              <Icon as={feature.icon} w={10} h={10} color="teal.500" />
              <Heading size="md">{feature.title}</Heading>
              <Text>{feature.description}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

### Testimonials.tsx
```typescript
import { Box, Container, Heading, Text, Avatar, Flex, VStack, HStack, SimpleGrid } from '@chakra-ui/react';
import { getTestimonialsContent } from '@/lib/data';

export default function Testimonials() {
  const testimonials = getTestimonialsContent();

  return (
    <Box py={16}>
      <Container maxW="container.xl">
        <Heading textAlign="center" mb={12}>{testimonials.title}</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {testimonials.items.map((testimonial, index) => (
            <Box key={index} p={6} bg="gray.50" borderRadius="md">
              <Text fontSize="lg" fontStyle="italic" mb={4}>"{testimonial.quote}"</Text>
              <HStack>
                <Avatar name={testimonial.name} src={testimonial.avatar} />
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">{testimonial.name}</Text>
                  <Text fontSize="sm">{testimonial.title}, {testimonial.company}</Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

### Contact.tsx
```typescript
"use client";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import { getContactContent } from '@/lib/data';

export default function Contact() {
  const content = getContactContent();

  return (
    <Box py={16} bg="gray.50">
      <Container maxW="container.md">
        <Heading textAlign="center" mb={8}>{content.title}</Heading>
        <VStack as="form" spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Your name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="your.email@example.com" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="How can we help you?" rows={6} />
          </FormControl>
          <Button colorScheme="teal" size="lg" width="full">{content.buttonText}</Button>
        </VStack>
      </Container>
    </Box>
  );
}
```

### Footer.tsx
```typescript
import { Box, Container, Flex, Link, Text, SimpleGrid, Stack, Heading } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box bg="gray.800" color="white" py={10}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          <Stack spacing={6}>
            <Heading size="md">Antigua Digital</Heading>
            <Text>AI-powered solutions for modern businesses.</Text>
          </Stack>
          <Stack>
            <Heading size="sm" mb={4}>Product</Heading>
            <Link>Features</Link>
            <Link>Pricing</Link>
            <Link>Case Studies</Link>
            <Link>Documentation</Link>
          </Stack>
          <Stack>
            <Heading size="sm" mb={4}>Company</Heading>
            <Link>About</Link>
            <Link>Team</Link>
            <Link>Careers</Link>
            <Link>Contact</Link>
          </Stack>
          <Stack>
            <Heading size="sm" mb={4}>Legal</Heading>
            <Link>Privacy Policy</Link>
            <Link>Terms of Service</Link>
          </Stack>
        </SimpleGrid>
        <Text mt={10} pt={6} borderTop="1px" borderColor="gray.700" textAlign="center">
          © {new Date().getFullYear()} Antigua Digital. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
```

## 3. Data Files

### /src/app/data/hero.json
```json
{
  "title": "AI-powered Sales Agent",
  "subtitle": "Boost your conversion with our intelligent chat system.",
  "cta": "Get Started"
}
```

### /src/app/data/features.json
```json
{
  "title": "Key Features",
  "items": [
    {
      "title": "AI-Powered Conversations",
      "description": "Our advanced AI understands customer intent and responds naturally.",
      "icon": "ChatIcon"
    },
    {
      "title": "24/7 Availability",
      "description": "Never miss a lead with round-the-clock automated responses.",
      "icon": "TimeIcon"
    },
    {
      "title": "Seamless Integration",
      "description": "Easily integrate with your existing CRM and sales tools.",
      "icon": "LinkIcon"
    },
    {
      "title": "Data Insights",
      "description": "Gain valuable insights from customer interactions and improve your sales process.",
      "icon": "StarIcon"
    },
    {
      "title": "Multilingual Support",
      "description": "Communicate with customers in their preferred language.",
      "icon": "GlobeIcon"
    },
    {
      "title": "Customizable Workflows",
      "description": "Tailor the conversation flow to match your sales process.",
      "icon": "SettingsIcon"
    }
  ]
}
```

### /src/app/data/testimonials.json
```json
{
  "title": "What Our Customers Say",
  "items": [
    {
      "quote": "Implementing Antigua Digital's AI sales agent increased our conversion rate by 35% in just two months.",
      "name": "Sarah Johnson",
      "title": "VP of Sales",
      "company": "TechCorp Inc.",
      "avatar": "/avatars/sarah.jpg"
    },
    {
      "quote": "The AI agent handles routine inquiries perfectly, allowing our team to focus on complex customer needs.",
      "name": "Michael Chen",
      "title": "Customer Success Manager",
      "company": "Innovate Solutions",
      "avatar": "/avatars/michael.jpg"
    },
    {
      "quote": "We've seen a 40% reduction in response time and a significant improvement in customer satisfaction.",
      "name": "Elena Rodriguez",
      "title": "Director of Marketing",
      "company": "Global Retail",
      "avatar": "/avatars/elena.jpg"
    },
    {
      "quote": "The seamless integration with our existing systems made adoption incredibly smooth for our team.",
      "name": "David Kim",
      "title": "CTO",
      "company": "StartUp Ventures",
      "avatar": "/avatars/david.jpg"
    }
  ]
}
```

### /src/app/data/contact.json
```json
{
  "title": "Get in Touch",
  "subtitle": "Have questions? We're here to help.",
  "buttonText": "Send Message"
}
```

## 4. Update Data Loading Utilities

### /src/lib/data.ts
```typescript
import fs from 'fs';
import path from 'path';

// Helper function to read JSON files
function readJsonFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  const jsonData = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(jsonData);
}

// Content loading functions
export function getHeroContent() {
  return readJsonFile('src/app/data/hero.json');
}

export function getFeaturesContent() {
  return readJsonFile('src/app/data/features.json');
}

export function getTestimonialsContent() {
  return readJsonFile('src/app/data/testimonials.json');
}

export function getContactContent() {
  return readJsonFile('src/app/data/contact.json');
}
```

## 5. Update Main Page

### /src/app/page.tsx
```typescript
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
```

## 6. Implementation Steps

1. Create the directory structure:
   - Create `/src/app/components/`
   - Create `/src/app/data/`

2. Create the data files:
   - Create the JSON files in `/src/app/data/`

3. Update the data loading utilities:
   - Modify `/src/lib/data.ts` to include functions for all content types

4. Create the component files:
   - Create all component files in `/src/app/components/`

5. Update the main page:
   - Modify `/src/app/page.tsx` to use the new components

## 7. Additional Considerations

- **Icons**: We'll need to import appropriate icons from Chakra UI or Material UI
- **Images**: We'll need to create an `/avatars/` directory in `/public/` for testimonial avatars
- **Responsive Design**: All components are designed to be responsive using Chakra UI's responsive props
- **Accessibility**: We've included proper semantic HTML and ARIA attributes
- **Performance**: We're using server components where appropriate to optimize performance
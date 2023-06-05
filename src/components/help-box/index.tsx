import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Manager'];
  const roles = ['Manager', 'Legal', 'Finance', 'CFO', 'Guest'];
  const applicationName = 'invoiceMaster1121';
  const tenantName = 'Organisation';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Manager:
1. As a Manager, I want to be able to create and manage multiple organizations within the InvoiceMaster platform so that I can oversee all invoicing and payments for my businesses.
2. As a Manager, I want to be able to invite and assign roles (Legal, Finance, CFO) to members of my organization so that they can access and manage their respective responsibilities within the InvoiceMaster platform.
3. As a Manager, I want to be able to view and analyze the overall financial performance of my organization(s) through customizable reports and dashboards so that I can make informed business decisions.
4. As a Manager, I want to be able to set up and manage integrations with my existing accounting infrastructure so that I can streamline my financial processes.
5. As a Manager, I want to be able to monitor and manage the API usage of my organization so that I can ensure the smooth operation of the InvoiceMaster platform.

Legal:
1. As a Legal team member, I want to be able to review and approve invoices and payment requests so that they comply with legal and regulatory requirements.
2. As a Legal team member, I want to be able to manage and store contracts and agreements related to invoicing and payments so that they are easily accessible and organized.
3. As a Legal team member, I want to be able to collaborate with other team members (Finance, CFO) on invoice and payment-related matters so that we can ensure compliance and accuracy.

Finance:
1. As a Finance team member, I want to be able to create, send, and manage invoices for my organization so that I can efficiently handle our accounts receivable.
2. As a Finance team member, I want to be able to process and track payments from other businesses so that I can manage our accounts payable.
3. As a Finance team member, I want to be able to collaborate with other team members (Legal, CFO) on invoice and payment-related matters so that we can ensure accuracy and compliance.
4. As a Finance team member, I want to be able to generate financial reports and statements so that I can provide accurate and up-to-date information to the Manager and CFO.

CFO:
1. As a CFO, I want to be able to review and approve invoices and payment requests so that I can ensure the financial integrity of my organization.
2. As a CFO, I want to be able to access and analyze financial reports and statements so that I can make informed financial decisions for my organization.
3. As a CFO, I want to be able to collaborate with other team members (Legal, Finance) on invoice and payment-related matters so that we can ensure accuracy and compliance.
4. As a CFO, I want to be able to monitor the overall financial performance of my organization through customizable reports and dashboards so that I can make informed business decisions.

Guest:
1. As a Guest, I want to be able to view and pay invoices sent to me by an organization using InvoiceMaster so that I can fulfill my financial obligations.
2. As a Guest, I want to be able to securely store my payment information so that I can easily make payments in the future.
3. As a Guest, I want to be able to access and download invoices and payment receipts for my records so that I can keep track of my transactions with the organization.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

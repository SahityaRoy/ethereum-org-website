import { useTranslation } from "next-i18next"
import type { HTMLAttributes } from "react"
import {
  Box,
  type BoxProps,
  chakra,
  Grid,
  SimpleGrid,
  Text,
  UnorderedList,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, StakingFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import DocLink from "@/components/DocLink"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import LeftNavBar from "@/components/LeftNavBar"
import {
  ContentContainer,
  Heading1 as MdHeading1,
  Heading4 as MdHeading4,
  MobileButton,
  MobileButtonDropdown,
  Page,
} from "@/components/MdComponents"
import OldHeading from "@/components/OldHeading"
import ProductDisclaimer from "@/components/ProductDisclaimer"
import StakingCommunityCallout from "@/components/Staking/StakingCommunityCallout"
import StakingComparison from "@/components/Staking/StakingComparison"
import StakingConsiderations from "@/components/Staking/StakingConsiderations"
import StakingGuides from "@/components/Staking/StakingGuides"
import StakingHowSoloWorks from "@/components/Staking/StakingHowSoloWorks"
import StakingLaunchpadWidget from "@/components/Staking/StakingLaunchpadWidget"
import StakingProductsCardGrid from "@/components/Staking/StakingProductsCardGrid"
import WithdrawalCredentials from "@/components/Staking/WithdrawalCredentials"
import WithdrawalsTabComparison from "@/components/Staking/WithdrawalsTabComparison"
import TableOfContents from "@/components/TableOfContents"
import { Flex } from "@/components/ui/flex"
import UpgradeStatus from "@/components/UpgradeStatus"

import { cn } from "@/lib/utils/cn"

const Heading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1 className="md:text-5xl" {...props} />
)

const Heading4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading4 className="font-semibold max-md:text-md" {...props} />
)

const Paragraph = (props: ChildOnlyProp) => (
  <Text fontSize="md" mt={8} mb={4} color="text300" {...props} />
)

const Pre = (props: ChildOnlyProp) => (
  <Text
    as="pre"
    maxW="full"
    overflowX="scroll"
    bgColor="preBackground"
    borderRadius="base"
    p={4}
    border="1px solid"
    borderColor="preBorder"
    whiteSpace="pre-wrap"
    {...props}
  />
)

export const InfoGrid = (props: ChildOnlyProp) => (
  <Grid
    templateColumns="repeat(auto-fill, minmax(min(100%, 340px), 1fr))"
    gap={8}
    sx={{
      "& > div": {
        h: "fit-content",
        m: 0,
        "&:hover": {
          transition: "0.1s",
          transform: "scale(1.01)",
          svg: {
            transition: "0.1s",
            transform: "scale(1.1)",
          },
        },
      },
    }}
    {...props}
  />
)

const CardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid
    columns={{ base: 1, md: 3 }}
    spacing={8}
    m={{ base: "auto", md: 0 }}
    sx={{
      h3: {
        mt: 0,
      },
    }}
    {...props}
  />
)

const Title = (props: ChildOnlyProp) => (
  <OldHeading
    as="h1"
    fontSize="2.5rem"
    lineHeight={1.4}
    fontWeight="bold"
    mt={4}
    {...props}
  />
)

const SummaryPoint = (props: ChildOnlyProp) => (
  <chakra.li color="text300" {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    className={cn(
      "max-h-full min-h-[500px] flex-col items-center px-0 py-8 lg:max-h-[500px] lg:flex-row lg:px-8",
      "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
    )}
    {...props}
  />
)

const TableContainer = (props: BoxProps) => (
  <Box
    w="fit-content"
    mx={["auto", null, null, 0]}
    sx={{
      table: {
        borderCollapse: "separate",
        borderSpacing: "1rem 0",
      },
      th: {
        whiteSpace: "break-spaces !important",
        textAlign: "center",
      },
    }}
    {...props}
  />
)

// Staking layout components
export const stakingComponents = {
  h1: Heading1,
  h4: Heading4,
  p: Paragraph,
  pre: Pre,
  CardGrid,
  DocLink,
  InfoGrid,
  ProductDisclaimer,
  StakingComparison,
  StakingConsiderations,
  StakingGuides,
  StakingHowSoloWorks,
  StakingLaunchpadWidget,
  StakingProductsCardGrid,
  TableContainer,
  UpgradeStatus,
  WithdrawalCredentials,
  WithdrawalsTabComparison,
}

type StakingLayoutProps = ChildOnlyProp &
  Pick<MdPageContent, "slug" | "tocItems" | "contentNotTranslated"> & {
    frontmatter: StakingFrontmatter
  }

export const StakingLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  contentNotTranslated,
}: StakingLayoutProps) => {
  const { t } = useTranslation("page-staking")
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const { summaryPoints } = frontmatter

  const dropdownLinks: ButtonDropdownList = {
    text: t("page-staking-dropdown-staking-options"),
    ariaLabel: t("page-staking-dropdown-staking-options-alt"),
    items: [
      {
        text: t("page-staking-dropdown-home"),
        href: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: t("page-staking-dropdown-solo"),
        href: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: t("page-staking-dropdown-saas"),
        href: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: t("page-staking-dropdown-pools"),
        href: "/staking/pools/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
      {
        text: t("page-staking-dropdown-withdrawals"),
        href: "/staking/withdrawals/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked about withdrawals",
        },
      },
    ],
  }

  return (
    <Box
      position="relative"
      width="full"
      dir={contentNotTranslated ? "ltr" : "unset"}
    >
      <HeroContainer>
        <Flex className="flex-col p-8">
          <Breadcrumbs slug={slug} mb="8" />
          <Title>{frontmatter.title}</Title>
          <UnorderedList>
            {(summaryPoints || []).map((point, idx) => (
              <SummaryPoint key={idx}>{point}</SummaryPoint>
            ))}
          </UnorderedList>
          <TableOfContents
            position="relative"
            zIndex={2}
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            isMobile
          />
        </Flex>
        <Image
          src={frontmatter.image}
          blurDataURL={frontmatter.blurDataURL}
          alt={frontmatter.alt || ""}
          style={{ objectFit: "contain" }}
          width={400}
          height={340}
          priority
        />
      </HeroContainer>
      <Page>
        {/* TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <LeftNavBar
          hideBelow={lgBp}
          dropdownLinks={dropdownLinks}
          tocItems={tocItems}
          maxDepth={frontmatter.sidebarDepth!}
        />
        <ContentContainer>
          {children}
          <StakingCommunityCallout className="my-16" />
          <FeedbackCard />
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Box>
  )
}

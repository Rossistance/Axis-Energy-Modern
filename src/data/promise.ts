/**
 * The promise (3 P's update, approved by the owner 2026-11-02): one brand line in three beats,
 * seven commitments, and the proof Axis will publish once it has the figures. Since 2026-11-20
 * each commitment's proof is written into its body, and the site no longer names it "The Axis
 * Promise" (owner, 2026-11-20).
 */
import { company } from '@data/company';
import { stateList } from '@lib/format';

/**
 * The brand line under "The Power of Partnership" on the home page, also the Why Axis header,
 * and the line that follows it in the hero (Ross, 2026-11-21). They replace the three-beat
 * promise "Built right. Energized on schedule. Performing for years.", whose third beat never
 * read right and repeated the diagram's "Performance built".
 */
export const brandLine = 'Built by owners, for owners.';
export const brandStatement = 'Your name is on the plant. Ours is on the work.';

export interface Commitment {
  icon: string;
  title: string;
  /** The commitment, why it matters and the proof behind it, as one passage. */
  body: string;
  link?: { label: string; href: string };
}

const omArea = stateList(company.omStates);

export const commitments: Commitment[] = [
  {
    icon: 'lucide:user-check',
    title: 'One accountable team',
    body: 'A named project manager and superintendent stay with your project from notice to proceed through turnover, and you have their direct line. Projects drift when no one is clearly in charge of the next decision, which is why an experienced Axis superintendent is on every one of our sites today.',
  },
  {
    icon: 'lucide:calendar-check',
    title: 'No surprises',
    body: 'You get a weekly look-ahead schedule and photo report on every project, and change orders are priced and approved before the work, not after. Those same documented controls let us take over Hertford Solar, a stalled project, and carry it to commissioning.',
    link: { label: 'Hertford Solar', href: '/project/hertford-solar/' },
  },
  {
    icon: 'lucide:zap',
    title: 'We own energization',
    body: 'Medium-voltage work, the point of interconnection, cable testing and commissioning are led by our own electrical team, so there is no hand-off at the step where projects most often stall. Our electrical roots go back to 1910, and VLF / Tan Delta cable testing is done in house.',
    link: {
      label: 'Electrical infrastructure',
      href: '/services/electrical-infrastructure-and-commissioning/',
    },
  },
  {
    icon: 'lucide:shield-check',
    title: 'Backed and bonded',
    body: 'When a contractor runs short of cash or credit, the owner usually finds out on site. Axis is part of 1910 Legacy Enterprises, building across the Southeast since 1910, and that backing stands behind our payment and performance bonding, our procurement and the resources your project needs.',
  },
  {
    icon: 'lucide:folder-check',
    title: 'Documented turnover',
    body: 'At handover you receive as-built drawings, test and commissioning reports and an infrared baseline of the array, so operations start from facts, not guesswork. It is the same testing discipline that restored Solar 55, a neglected 2.0 MWac plant, through forensic assessment, testing and performance verification.',
    link: { label: 'Solar 55', href: '/project/mount-olive-asset-recovery/' },
  },
  {
    icon: 'lucide:timer',
    // The promise is a reply to the request, not a technician on site (Ross, 2026-11-20).
    title: 'A response to every request within 24 hours',
    body: `Tell us about a plant you own, or a problem with one, and we respond to your request ${company.responseTime}. Our O&M teams cover ${omArea}, and corrective maintenance and rapid response are part of every Axis O&M agreement, so fixing a fault does not wait on a new contract.`,
    link: { label: 'O&M services', href: '/om-and-technical-services/#corrective-maintenance' },
  },
  {
    icon: 'lucide:flag',
    title: 'We finish what we start, and what others started',
    body: 'If your contractor walks away, we step in, restore compliance and carry the project to energization. At Hertford Solar we took over at clearing and grading and delivered the plant through interconnection.',
    link: { label: 'Project Rescue', href: '/services/project-rescue/' },
  },
];

export interface ProofPoint {
  label: string;
  icon: string;
  /** The published figure. Points without one are left out of production builds. */
  value?: string;
  /** Who supplies the figure. */
  source: string;
}

/**
 * Proof to publish under By the numbers once the figures arrive. Safety rates are 1910 Legacy
 * Enterprises' consolidated figures, not Axis's own (owner, 2026-11-02: one injury at Axis's
 * headcount and hours would put its TRIR far out of line).
 */
export const proofPoints: ProofPoint[] = [
  {
    label: 'EMR, three-year average · 1910 Legacy Enterprises, consolidated',
    icon: 'lucide:hard-hat',
    source: 'Josh Butler / 1910 Legacy Safety',
  },
  {
    label: 'TRIR · 1910 Legacy Enterprises, consolidated',
    icon: 'lucide:activity',
    source: 'Josh Butler / 1910 Legacy Safety',
  },
  {
    label: 'Projects energized on the contract schedule',
    icon: 'lucide:calendar-check',
    source: 'Josh Butler',
  },
  { label: 'Repeat clients', icon: 'lucide:repeat', source: 'Josh Butler' },
];

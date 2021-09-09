import clsx from 'clsx';
import React, { useRef } from 'react';
import Tippy from '@tippyjs/react';
import { useHoverDirty } from 'react-use';

import { Typography } from 'src/common';
import { useStablecoinOldChartStyles } from './stablecoin-old-chart.styles';

export type StablecoinOldChartProps = {
  className?: string;
};

export const StablecoinOldChart: React.VFC<StablecoinOldChartProps> = (
  props
) => {
  const classes = useStablecoinOldChartStyles();

  const fivem = useRef(null);
  const onem = useRef(null);

  const eightm = useRef(null);
  const twom = useRef(null);

  const elevenm = useRef(null);
  const fourm = useRef(null);

  const thirteenm = useRef(null);
  const fivem2 = useRef(null);

  const eightteenm = useRef(null);
  const sevenm = useRef(null);

  const isHovering5m = useHoverDirty(fivem);
  const isHovering1m = useHoverDirty(onem);

  const isHovering8m = useHoverDirty(eightm);
  const isHovering2m = useHoverDirty(twom);

  const isHovering11m = useHoverDirty(elevenm);
  const isHovering4m = useHoverDirty(fourm);

  const isHovering13m = useHoverDirty(thirteenm);
  const isHovering5m2 = useHoverDirty(fivem2);

  const isHovering18m = useHoverDirty(eightteenm);
  const isHovering7m = useHoverDirty(sevenm);

  return (
    <div className={props.className}>
      <div className={classes.chart}>
        <div className={classes.lines}>
          <div className={classes.line}>
            <div className={classes.lineLegend}>$1700M</div>
          </div>
          <div className={classes.line}>
            <div className={classes.lineLegend}>$1000M</div>
          </div>
          <div className={classes.line}>
            <div className={classes.lineLegend}>$700M</div>
          </div>
          <div className={classes.line}>
            <div className={classes.lineLegend}>$300M</div>
          </div>
          <div className={classes.line}>
            <div className={classes.lineLegend}>$100M</div>
          </div>
          <div className={classes.line}>
            <div className={classes.lineLegend}>$0</div>
          </div>
        </div>
        <div className={classes.bars}>
          <div className={classes.bar}>
            <Tippy
              visible={isHovering5m}
              content="$100M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barUnfilled)}
                ref={fivem}
              />
            </Tippy>
            <Tippy
              visible={isHovering1m}
              content="$5M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barFilled)}
                ref={onem}
              />
            </Tippy>
            <div className={classes.year}>2021</div>
          </div>

          <div className={classes.bar}>
            <Tippy
              visible={isHovering8m}
              content="$300M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barUnfilled)}
                ref={eightm}
              />
            </Tippy>
            <Tippy
              visible={isHovering2m}
              content="$15M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barFilled)}
                ref={twom}
              />
            </Tippy>
            <div className={classes.year}>2022</div>
          </div>
          <div className={classes.bar}>
            <Tippy
              visible={isHovering11m}
              content="$700M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barUnfilled)}
                ref={elevenm}
              />
            </Tippy>
            <Tippy
              visible={isHovering4m}
              content="$35M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barFilled)}
                ref={fourm}
              />
            </Tippy>
            <div className={classes.year}>2023</div>
          </div>
          <div className={classes.bar}>
            <Tippy
              visible={isHovering13m}
              content="$1000M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barUnfilled)}
                ref={thirteenm}
              />
            </Tippy>
            <Tippy
              visible={isHovering5m2}
              content="$50M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barFilled)}
                ref={fivem2}
              />
            </Tippy>
            <div className={classes.year}>2024</div>
          </div>
          <div className={classes.bar}>
            <Tippy
              visible={isHovering18m}
              content="$1700M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barUnfilled)}
                ref={eightteenm}
              />
            </Tippy>
            <Tippy
              visible={isHovering7m}
              content="$85M"
              maxWidth={248}
              animation={false}
              className={classes.tippy}
            >
              <div
                className={clsx(classes.barHalf, classes.barFilled)}
                ref={sevenm}
              />
            </Tippy>
            <div className={classes.year}>2025</div>
          </div>
        </div>
      </div>
      <div className={classes.legend}>
        <Typography
          variant="body2"
          className={classes.legendItem}
          component="div"
        >
          <div className={clsx(classes.barHalf, classes.barUnfilled)} />
          <span>— target collateral value</span>
        </Typography>
        <Typography
          variant="body2"
          className={classes.legendItem}
          component="div"
        >
          <div className={clsx(classes.barHalf, classes.barFilled)} />
          <span>— target coupon income</span>
        </Typography>
      </div>
    </div>
  );
};

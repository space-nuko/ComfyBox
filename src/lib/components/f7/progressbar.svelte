<!--
Fix a framework7 issue
https://github.com/framework7io/framework7/issues/4183
-->
<script>
 let className = undefined;
 export { className as class };

 export let progress = 0;
 export let infinite = false;

 function colorClasses(props) {
     const { color, textColor, bgColor, borderColor, rippleColor, dark } = props;

     return {
         dark,
         [`color-${color}`]: color,
         [`text-color-${textColor}`]: textColor,
         [`bg-color-${bgColor}`]: bgColor,
         [`border-color-${borderColor}`]: borderColor,
         [`ripple-color-${rippleColor}`]: rippleColor,
     };
 }

 function classNames(...args) {
     const classes = [];
     args.forEach((arg) => {
         if (typeof arg === 'object' && arg.constructor === Object) {
             Object.keys(arg).forEach((key) => {
                 if (arg[key]) classes.push(key);
             });
         } else if (arg) classes.push(arg);
     });
     const uniqueClasses = [];
     classes.forEach((c) => {
         if (uniqueClasses.indexOf(c) < 0) uniqueClasses.push(c);
     });
     return uniqueClasses.join(' ');
 }

 let classes
 $: classes = classNames(
     className,
     'progressbar',
     {
         'progressbar-infinite': infinite,
     },
     colorClasses($$props),
 );

 let transformStyle = ""
 $: transformStyle = progress ? `translate3d(${-100 + progress}%, 0, 0)` : '';
</script>

<span class={classes}
      data-progress={progress} >
    <span style:transform={transformStyle} />
</span>

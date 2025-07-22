type TagData=Record<string,any>;
export function customTagger(componentName:string,data?:TagData){
  const timestamp=new Data().toISOString();
  console.debug('[Tagger]$(timestamp}-${componentName}',data??{});
